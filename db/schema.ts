import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const repos = pgTable("repos", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    url: text("url").notNull().unique(),
    category: text("category").notNull(),
    stars: integer("stars").notNull().default(0),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const subscribers = pgTable("subscribers", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    label: text("label").notNull(),
    icon: text("icon"),
});

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    username: text("username").notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type Repo = typeof repos.$inferSelect;
export type NewRepo = typeof repos.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
