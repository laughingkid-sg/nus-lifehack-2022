# EarnCycle

By OneWolves

-   [Goh Zheng Teck](https://github.com/laughingkid-sg)
-   [Kwan Hao Wei](https://github.com/kwanhw)

# Problem Statement

In 2021, the National Environment Agency lamented that Singapore'sIn 2021, the National Environment Agency lamented that Singapore’s recycling rate had fallen to a 10 year low. What can we do to encourage more people to recycle, or make recycling more convenient and accessible?

# Target Audience

Youths aged 35 and under.

# Core Features

-   **Reminders and Awareness**

With the convenience of a Telegram Bot, weekly reminders or tips can be sent to users so that they will not forget their scheduled collections and find new ways to recycle.

Our bot will be able to send reminders for upcoming door-to-door collections. This will allow Singaporeans to better manage their recycling schedules and take note of upcoming collections. This is to replace physical flyers which helps reduce paper waste.

The bot will also send weekly tips on recycling and recycling efforts in Singapore to help better educate users.

-   **Item Recognition**

Sometimes it is difficult to remember what items can be recycled. Users can simply upload an image to the bot and tell the users if it can be recycled. This will help Singaporeans better differentiate between non-recyclables and recyclables.

-   **Schedule Collection**

For Singaporeans who can't be around for the monthly upcoming door-to-door collections, we create an eCommerce-like web application on Telegram where users can easily add their recyclables to a "cart" and "checkout" to schedule a collection with recycling partners. By doing so, they can stand a chance to earn points which can be redeemed as vouchers.

# Technology Stack

-   Language: Typescript
-   Frontend: React with Chakra UI on Netlify
-   Backend: Node.js with Express on Azure Web Apps
-   Database: Microsoft SQL (via TypeORM)
-   Other: Telegraf, Azure Computer Vision

The Telegraf library is used to handle requests from Telegram and Azure Computer Vision is used for image recognition.
