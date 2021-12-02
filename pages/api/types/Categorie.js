import { extendType, objectType, stringArg } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Categorie = objectType({
    name: "Categorie",
    definition(t) {
        t.int("id");
        t.string("libelle");
        t.list.field('coursCategorie', {
          type: 'coursCategorie',
          resolve: parent =>
            prisma.categorie
              .findOne({
                where: { id: Number(parent.id) },
              })
              .coursCategorie(),
        });
        t.field("categorieMere", {
            type: "Categorie",
            nullable: true,
            resolve: (parent) =>
              prisma.categorie
                .findOne({
                  where: { id: Number(parent.id) },
                })
                .categorieMere(),
          });
    },
});

export const QueryCategorie = extendType({
    type: "Query",
    definition(t) {
      t.field("cagtegorieById", {
        type: "Categorie",
        args: {
          coursId: stringArg({ nullable: false }),
        },
        resolve: (_, args) => {
          return prisma.categorie.findOne({
            where: { id: Number(args.coursId) },
          });
        },
      });

      t.nonNull.list.nonNull.field('users', {
        type: 'User',
        resolve(_, __, ctx) {
          return prisma.categorie.findMany();
        }
      })
    }
});

const MutationCategorie = objectType({
    name: "Mutation",
    definition(t) {
      t.field("addCategorie", {
        type: "Categorie",
        args: {
          libelle: stringArg({ nullable: false }),
          email: stringArg({ nullable: false }),
          password: stringArg({ nullable: false }),
        },
        resolve: (_, { name, email, password }, ctx) => {
          return prisma.utilisateur.create({
            data: {
              name,
              email,
              password,
            },
          });
        },
      });
  
      t.field("deletePost", {
        type: "Cours",
        nullable: true,
        args: {
          coursId: stringArg(),
        },
        resolve: (_, { coursId }, ctx) => {
          return prisma.cours.delete({
            where: { id: Number(coursId) },
          });
        },
      });
  
      t.field("createDraft", {
        type: "Cours",
        args: {
          titre: stringArg({ nullable: false }),
          contentMd: stringArg(),
          authorEmail: stringArg(),
        },
        resolve: (_, { titre, contentMd, authorEmail }, ctx) => {
          return prisma.cours.create({
            data: {
              titre,
              contentMd,
              estArchive: true,
              author: {
                connect: { email: authorEmail },
              },
            },
          });
        },
      });
  
      t.field("publish", {
        type: "Cours",
        nullable: true,
        args: {
          coursId: stringArg(),
        },
        resolve: (_, { coursId }, ctx) => {
          return prisma.cours.update({
            where: { id: Number(coursId) },
            data: { estArchive: false },
          });
        },
      });
    },
  });