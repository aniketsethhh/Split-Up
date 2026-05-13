import {defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
  /* this is users table */
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()),
  })
  .index("by_token", ["tokenIdentifier"])
  .index("by_email", ["email"])
  .searchIndex("search_name", {searchField:"name"})
  .searchIndex("search_email", {searchField:"email"}),


  /* this is expenses table */

  expenses:defineTable({
    description: v.string(),
    amount: v.number(),
    category: v.optional(v.string()),
    date: v.number(),//timestamp
    paidByUserId: v.id("users"),//reference to users table (foreign key)
    splitType: v.string(), //equal / percentage / exact
    splits: v.array(
      v.object({
        userId: v.id("users"),
        amount: v.number(),
        paid: v.boolean(),
      })
    ),
    groupId:v.optional(v.id("groups")),
    createdBy:v.id("users"),
  })
  .index("by_group", ["groupId"])
  .index("by_user_and_group", ["paidByUserId", "groupId"])
  .index("by_date", ["date"]),

  /* this is groups table */
  groups:defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    createdBy:v.id("users"),
    members: v.array(
      v.object({
        userId: v.id("users"),
        role:v.string(), //admin / member
        joinedAt:v.number(), //timestamp
      })
    ),
  }),

  /* this is settlement table */
 settlements:defineTable({
  amount: v.number(),
  note: v.optional(v.string()),
  date: v.number(), //timestamp
  paidByUserId: v.id("users"),
  receivedByUserId: v.id("users"),
  groupId: v.optional(v.id("groups")),
  relatedExpenseIds: v.optional(v.array(v.id("expenses"))),
  createdBy:v.id("users"),

  })
  .index("by_group", ["groupId"])
  .index("by_user_and_group", ["paidByUserId","groupId"])
  .index("by_receiver_and_group", ["receivedByUserId","groupId"])
  .index("by_date", ["date"]),



});



  