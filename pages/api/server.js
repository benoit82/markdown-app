import { makeSchema, objectType, stringArg } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-micro";
import path from "path";

const prisma = new PrismaClient();

const Utilisateur = objectType({
  name: "Utilisateur",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("email");
    t.string("password");
    t.list.field('Cours', {
        type: 'Cours',
        resolve: parent =>
          prisma.utilisateur
            .findOne({
              where: { id: Number(parent.id) },
            })
            .Cours(),
      });
    t.list.field('notesCours', {
        type: 'notesCours',
        resolve: parent =>
          prisma.utilisateur
            .findOne({
              where: { id: Number(parent.id) },
            })
            .notesCours(),
      });
    t.field("role", {
        type: "Role",
        nullable: true,
        resolve: (parent) =>
          prisma.utilisateur
            .findOne({
              where: { id: Number(parent.id) },
            })
            .role(),
      });
  },
});

const Cours = objectType({
  name: "Cours",
  definition(t) {
    t.int("id");
    t.string("titre");
    t.string("contenuMd", {
      nullable: true,
    });
    t.string("resume", {
        nullable: true,
    });
    t.int("dateRedaction", {
        nullable: true,
    });
    t.int("dateParution", {
        nullable: true,
    });
    t.int("nbConssultation", {
        nullable: true,
    });
    t.boolean("estArchive");
    t.field("author", {
      type: "Utilisateur",
      nullable: true,
      resolve: (parent) =>
        prisma.cours
          .findOne({
            where: { id: Number(parent.id) },
          })
          .author(),
    });
  },
});

const Role = objectType({
    name: "Role",
    definition(t) {
        t.int("id");
        t.string("role", {
            nullable: true,
        });
        t.list.field('Utilisateur', {
          type: 'Utilisateur',
          resolve: parent =>
            prisma.role
              .findOne({
                where: { id: Number(parent.id) },
              })
              .Utilisateur(),
        });
    },
});

const Categorie = objectType({
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

const notesCours = objectType({
    name: "notesCours",
    definition(t) {
        t.int("id");
        t.int("date", {
            nullable: true,
        });
        t.int("note", {
            nullable: true,
        });
        t.string("annotation", {
            nullable: true,
        });
        t.field("utilisateur", {
            type: "Utilisateur",
            nullable: true,
            resolve: (parent) =>
              prisma.notesCours
                .findOne({
                  where: { id: Number(parent.id) },
                })
                .utilisateur(),
          });
        t.field("cour", {
            type: "Cours",
            nullable: true,
            resolve: (parent) =>
              prisma.notesCours
                .findOne({
                  where: { id: Number(parent.id) },
                })
                .cour(),
          });
    },
});

const coursCategorie = objectType({
    name: "coursCategorie",
    definition(t) {
        t.int("id");
        t.field("categorie", {
            type: "Categorie",
            nullable: true,
            resolve: (parent) =>
              prisma.coursCategorie
                .findOne({
                  where: { id: Number(parent.id) },
                })
                .categorie(),
          });
        t.field("cour", {
            type: "Cours",
            nullable: true,
            resolve: (parent) =>
              prisma.coursCategorie
                .findOne({
                  where: { id: Number(parent.id) },
                })
                .cour(),
          });
    },
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("cours", {
      type: "Cours",
      args: {
        coursId: stringArg({ nullable: false }),
      },
      resolve: (_, args) => {
        return prisma.cours.findOne({
          where: { id: Number(args.coursId) },
        });
      },
    });

    t.list.field("feed", {
      type: "Cours",
      resolve: (_parent, _args, ctx) => {
        return prisma.cours.findMany({
          where: { estArchive: false },
        });
      },
    });

    t.list.field("drafts", {
      type: "Cours",
      resolve: (_parent, _args, ctx) => {
        return prisma.cours.findMany({
          where: { estArchive: true },
        });
      },
    });

    t.list.field("filterCours", {
      type: "Cours",
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return prisma.cours.findMany({
          where: {
            OR: [
              { titre: { contains: searchString } },
              { cocontenuMdntent: { contains: searchString } },
            ],
          },
        });
      },
    });
  },
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("signupUser", {
      type: "Utilisateur",
      args: {
        name: stringArg(),
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

export const schema = makeSchema({
  types: [Query, Mutation, Utilisateur, Cours, notesCours, coursCategorie, Categorie, Role],
  outputs: {
    typegen: path.join(process.cwd(), "pages", "api", "nexus-typegen.ts"),
    schema: path.join(process.cwd(), "pages", "api", "schema.graphql"),
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
const server = new ApolloServer({ schema });
const startServer = server.start();

export default async function handler(req, res) {

  await startServer;
  await server.createHandler({
    path: "/api/server",
  })(req, res);
}