import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);
const ADMIN_ID = process.env.ADMIN_ID;

bot.on("web_app_data", ctx => {
  const order = JSON.parse(ctx.message.web_app_data.data);

  let text = "🛒 НОВЫЙ ЗАКАЗ\n\n";
  order.items.forEach(i => {
    text += `${i.name} — ${i.qty}\n`;
  });

  text += `\n💳 Оплата: ${order.payment}`;
  if (order.comment) text += `\n📝 Комментарий: ${order.comment}`;

  ctx.telegram.sendMessage(ADMIN_ID, text);
});

bot.launch();
console.log("Bot started");
