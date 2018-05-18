![Hello, bot!](https://cdn.glitch.com/83eb7282-8b27-4a01-9b8c-1c12487c6c08%2Fhello-bot.png?1526659763652)

# Twitter Bot Starter Project with Webhooks and Account Activity API

This starter projects is based on [account-activity-dashboard](https://github.com/twitterdev/account-activity-dashboard) and uses Twitter's [Account Activity API](https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/overview).


## Tutorial

1. Create a Twitter app on [apps.twitter.com](https://apps.twitter.com/)

2. On the **Permissions** tab > **Access** section > enable **Read, Write and Access direct messages**.

3. On the **Keys and Access Tokens** tab > **Your Access Token** section > click **Create my access token** button.

4. From the **Keys and Access Tokens** tab, copy the `consumer key`, `consumer secret`, `access token` and `access token secret` and add them to your `.env` file.

5. Your webhook URL will be:

    ```text
    https://PROJECTNAME.glitch.me/webhook/twitter
    ```

6. Take note of the deployed URL, revisit your apps.twitter.com **Settings** page, and add the following URL values as whitelisted Callback URLs:

    ```text
    https://PROJECTNAME.glitch.me/callbacks/addsub
    https://PROJECTNAME.glitch.me/callbacks/removesub
    ```

7. To configure your webhook you can use this apps' web UI, or use the example scripts from the command line.


8. Load the web app in your browser and follow the instructions below.

  1. Setup webhook config. Navigate to the "manage webhook" view. Enter your webhook URL noted earlier and click "Create/Update."

  2. Add a user subscription. Navigate to the "manage subscriptions" view. Click "add" and proceed with Twitter sign-in. Once complete your webhook will start to receive account activity events for the user.

## TODO:

- make Account Activity log persistent (1 week?)