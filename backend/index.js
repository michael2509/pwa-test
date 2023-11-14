const express = require('express');
const webpush = require('web-push');
const cors = require('cors')
const connectToMongoDB = require('./db-connection');
const Subscription = require('./models/Subscription');

const app = express();

app.use(cors());
app.use(express.json());

connectToMongoDB();

const vapidKeys = {
    publicKey: 'BN6Dgs22Lox_eHucrca1GIlpeBh-iboEox_O4mE1mMC6EbZqy49MDlkg8o_xnc4wzKRQjKcsaebXeeabIjJqdyk',
    privateKey: 'Altg0jterIYOrf6kxR5quv8FF3z8m2bUhcrR2mJpQ6U'
}
webpush.setVapidDetails('https://monsite.com', vapidKeys.publicKey, vapidKeys.privateKey);

app.post('/subscribe', async (req, res) => {
    const existingSubscription = await Subscription.findOne({ 'endpoint': req.body.endpoint });

    if (existingSubscription) {
        return res.status(400).send('Subscription already exist');
    }

    const subscription = new Subscription(req.body);
    subscription.save();

    res.status(200).json({});
})

app.post('/send-notif', async (req, res) => {
    const subscriptions = await Subscription.find({});

    if (subscriptions.length === 0) {
        return res.status(404).send('Aucune subscription trouvée.');
    }

    const sendNotifications = subscriptions.map(async (subscription) => {
        try {
            const payload = {
                notification: req.body
            }
            await webpush.sendNotification(subscription, JSON.stringify(payload));
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la notification à une subscription :', error);

            // supprimer de la bdd la souscription si elle n'est plus utilisé
            if (error.statusCode === 410) {
                await Subscription.deleteOne({ endpoint: subscription.endpoint });
                console.log("deleted subscription with endpoint " + subscription.endpoint);
            }
        }
    });
    await Promise.all(sendNotifications);

    res.status(200).json({ message: 'Notifications envoyées avec succès à toutes les subscriptions.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
})