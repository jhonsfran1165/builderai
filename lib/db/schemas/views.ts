// TODO: implement views as soon as this is done https://orm.drizzle.team/docs/views
// import { pgView } from "drizzle-orm/pg-core"

// // TODO: use path alias
// import { organizations } from "./organizations"

// export const data_orgs_view = pgView("data_orgs_view").as((qb) =>
//   qb
//     .select({
//       id: organizations.id,
//       name: organizations.name,
//     })
//     .from(organizations)
// )

// // regular view
// const newYorkers = pgView('new_yorkers', {
//   id: serial('id').primaryKey(),
//   name: text('name').notNull(),
//   cityId: integer('city_id').notNull(),
// }).as(sql`select * from ${users} where ${eq(users.cityId, 1)}`);

// // materialized view
// const newYorkers = pgMaterializedView('new_yorkers', {
//   id: serial('id').primaryKey(),
//   name: text('name').notNull(),
//   cityId: integer('city_id').notNull(),
// }).as(sql`select * from ${users} where ${eq(users.cityId, 1)}`);
