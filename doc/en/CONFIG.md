# Configuration

It is recommended to fill in environment variables in the Workers configuration interface, rather than directly modifying variables in the JS code.

### KV Configuration
| KEY      | Special Explanation                                                             |
|:---------|---------------------------------------------------------------------------------|
| DATABASE | Create KV first, name it arbitrarily, and then set it to DATABASE when binding. |

### System Configuration
Configuration that is common to each user, usually filled in the Workers configuration interface.


| KEY                       | Description                                 | Default Value                   | Special Description                                                                                                                                                          |
|:--------------------------|---------------------------------------------|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API_KEY                   | OpenAI API Key                              | `null`                          | Multiple keys can be used at the same time, and one will be randomly selected when using the                                                                                 |
| CHAT_MODEL                | Open AI model                               | `gpt-3.5-turbo`                 |                                                                                                                                                                              |
| -                         | -                                           | -                               | -                                                                                                                                                                            |
| TELEGRAM_AVAILABLE_TOKENS | Support for multiple Telegram Bot Token     | `null`                          | Multiple Token separated by `,`                                                                                                                                              |
| -                         | -                                           | -                               | -                                                                                                                                                                            |
| CHAT_WHITE_LIST           | Chat ID Whitelisting                        | `null`                          | Multiple IDs are separated by `,`, not knowing the IDs, talking to the bot for a sentence returns                                                                            |
| I_AM_A_GENEROUS_PERSON    | Close the whitelist and allow access to all | `false`                         | Since many people don't want to whitelist, or don't know how to get an ID, setting this option will allow everyone to access it, with a value of `true`.                     |
| -                         | -                                           | -                               | -                                                                                                                                                                            |
| AUTO_TRIM_HISTORY         | Automatically trim history                  | `true`                          | To avoid the 4096 character limit, truncate the message                                                                                                                      |
| MAX_HISTORY_LENGTH        | Maximum history length                      | `20`                            | `When AUTO_TRIM_HISTORY is turned on` To avoid the 4096 character limit, truncate the message                                                                                |
| MAX_TOKEN_LENGTH          | Maximum number of historical tokens         | 2048                            | Too long and easy to timeout suggest setting at a suitable number                                                                                                            |
| GPT3_TOKENS_COUNT         | GTP counting mode                           | `false`                         | Use more accurate token counting mode instead of just judging string length, but it's easy to time out                                                                       |
| -                         | -                                           | -                               | -                                                                                                                                                                            |
| SYSTEM_INIT_MESSAGE       | System initialization message               | `You are a useful assistant.`   | Default robot init message                                                                                                                                                   |
| SYSTEM_INIT_MESSAGE_ROLE  | System initialization message Role          | `system`                        | Default robot init role                                                                                                                                                      |
| -                         | -                                           | -                               | -                                                                                                                                                                            |
| ENABLE_USAGE_STATISTICS   | Enable usage statistics                     | `false`                         | After enabling, each API call will be recorded in KV and can be viewed through `/usage`.                                                                                     |
| HIDE_COMMAND_BUTTONS      | Hide command buttons                        | `null`                          | Write the buttons you want to hide separated by commas `/start,/system`, remember to include slashes, and after modifying, reinitialize `init`.                              |
| SHOW_REPLY_BUTTON         | Show Quick Reply button                     | `false`                         | Display quick reply buttons.                                                                                                                                                 |
| -                         | -                                           | -                               | -                                                                                                                                                                            |
| UPDATE_BRANCH             | Git branch                                  | `master`                        | Branch where version detection is located                                                                                                                                    |
| -                         | -                                           | -                               | -                                                                                                                                                                            |
| DEBUG_MODE                | Debug mode                                  | `false`                         | Currently, the latest message can be saved to KV for convenient debugging. It consumes a lot of KV write volume and must be turned off in the production environment.        |
| DEV_MODE                  | Developer mode                              | `false`                         | Development testing                                                                                                                                                          |
| STREAM_MODE               | Stream mode                                 | `true`                          | Get a typewriter output mode similar to ChatGPT Web.                                                                                                                         |
| SAFE_MODE                 | Safe mode                                   | `true`                          | Safe mode will increase KV write overhead, but it can avoid Telegram's death loop retry caused by Workers timeout, reduce token waste, and it is not recommended to disable. |
| -                         | -                                           | -                               | -                                                                                                                                                                            |
| LANGUAGE                  | Language                                    | `zh-CN`                         | `zh-CN`，`zh-TW`, `en`                                                                                                                                                        |
| -                         | -                                           | -                               | -                                                                                                                                                                            |
| TELEGRAM_API_DOMAIN       | Telegram                                    | `https://api.telegram.org`      | Customization of Telegram API server.                                                                                                                                        |
| OPENAI_API_DOMAIN         | OpenAI                                      | `https://api.openai.com`        | Can be replaced with the domain name of other service providers compatible with OpenAI API.                                                                                  |
| -                         | -                                           | -                               | -                                                                                                                                                                            |
| AZURE_API_KEY             | azure api key                               | `null`                          | Support Azure API, choose either of the two keys.                                                                                                                            |
| AZURE_COMPLETIONS_API     | azure api url                               | `null`                          | `https://YOUR_RESOURCE_NAME.openai.azure.com/openai/deployments/YOUR_DEPLOYMENT_NAME/chat/completions?api-version=2023-05-15`                                                |
| -                         | -                                           | -                               | -                                                                                                                                                                            |
| WORKERS_AI_MODEL          | workers ai model                            | `@cf/meta/llama-2-7b-chat-int8` | You can check the model list.`https://developers.cloudflare.com/workers-ai/models/llm/`                                                                                      |



### Group Configuration
You can add the bot to a group, and then everyone in the group can chat with the bot.
> BREAKING CHANGE:
> Major changes, you must add the group ID to the whitelist `CHAT_GROUP_WHITE_LIST` to use it, otherwise anyone can add your bot to the group and consume your quota.

> IMPORTANT: Due to the privacy and security policies of restricted Telegram groups, if your group is a public group or has more than 2000 people, please set the bot as `administrator`, otherwise the bot will not respond to chat messages with `@bot`.

> IMPORTANT：Must set `/setprivacy` to `disable` in botfather, otherwise the bot will not respond to chat messages with `@bot`.

| KEY                       | Explanation                          | Default Value | Special Explanation                                                                                                                    |
|:--------------------------|--------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------|
| GROUP_CHAT_BOT_ENABLE     | Enable group chat bot                | `true`        | After enabling, the bot joins the group and everyone in the group can chat with the bot.                                               |
| TELEGRAM_BOT_NAME         | Bot name xxx_bot                     | `null`        | The order must be consistent with `TELEGRAM_AVAILABLE_TOKENS`, **must be set, otherwise it cannot be used in group chat**              |
| GROUP_CHAT_BOT_SHARE_MODE | Share chat history of group chat bot | `false`       | After enabling, the group has only one session and configuration. If disabled, each person in the group has their own session context. |
| CHAT_GROUP_WHITE_LIST     | Group chat ID whitelist              | `null`        | Separate multiple IDs with `,`. If you don't know the ID, you can chat with the bot in the group and it will return it.                |

### User Configuration
Custom configuration for each user, can only be modified by sending a message to Telegram, the message format is `/setenv KEY=VALUE`

| KEY                     | Explanation                                                                                                                                                        | Example                                                                                           |
|:------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| SYSTEM_INIT_MESSAGE     | System initialization parameters, even if a new session is started, it can still be maintained without debugging every time                                        | `/setenv SYSTEM_INIT_MESSAGE=Now it's Meow Niang, and every sentence ends with "meow"`            |
| OPENAI_API_EXTRA_PARAMS | Additional parameters for OpenAI API, which will be carried every time the API is called after setting, and can be used to adjust temperature and other parameters | `/setenv OPENAI_API_EXTRA_PARAMS={"temperature": 0.5}` Each modification must be a complete JSON. |
| OPENAI_API_KEY          | OpenAI API Key, once set, will be included in every API call. Each user can set their own key.                                                                     | `/setenv OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`        |


### Workers AI configuration
Add `AI = Workers AI Catalog` in `Project Home-Settings-Variables-AI Bindings`.


### Support command

| Command    | Description                                                          | Example                   |
|:-----------|:---------------------------------------------------------------------|:--------------------------|
| `/help`    | Get command help.                                                    | `/help`                   |
| `/new`     | Initiate a new conversation.                                         | `/new`                    |
| `/start`   | Get your ID and start a new conversation.                            | `/start`                  |
| `/img`     | Generate an image.                                                   | `/img Image description`  |
| `/version` | Get the current version number and determine if an update is needed. | `/version`                |
| `/setenv`  | Set user configuration, see `User Configuration` for details.        | `/setenv KEY=VALUE`       |
| `/delenv`  | Delete user configuration.                                           | `/delenv KEY`             |
| `/usage`   | Get the usage statistics of the current robot.                       | `/usage`                  |
| `/system`  | View some current system information.                                | `/system`                 |
| `/role`    | Set the preset identity, configure usage method same as `/setenv`.   | `/role`                   |
| `/redo`    | Modify the previous question or provide a different answer.          | `/redo 修改过的内容` 或者 `/redo` |
| `/echo`    | Echo message, only available in development mode.                    | `/echo`                   |

