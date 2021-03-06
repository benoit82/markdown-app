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
            .findUnique({
              where: { id: Number(parent.id) },
            })
            .Cours(),
      });
    t.list.field('notesCours', {
        type: 'notesCours',
        resolve: parent =>
          prisma.utilisateur
            .findUnique({
              where: { id: Number(parent.id) },
            })
            .notesCours(),
      });
    t.field("role", {
        type: "Role",
        nullable: true,
        resolve: (parent) =>
          prisma.utilisateur
            .findUnique({
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
          .findUnique({
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
              .findUnique({
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
              .findUnique({
                where: { id: Number(parent.id) },
              })
              .coursCategorie(),
        });
        t.field("categorieMere", {
            type: "Categorie",
            nullable: true,
            resolve: (parent) =>
              prisma.categorie
                .findUnique({
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
                .findUnique({
                  where: { id: Number(parent.id) },
                })
                .utilisateur(),
          });
        t.field("cour", {
            type: "Cours",
            nullable: true,
            resolve: (parent) =>
              prisma.notesCours
                .findUnique({
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
                .findUnique({
                  where: { id: Number(parent.id) },
                })
                .categorie(),
          });
        t.field("cours", {
            type: "Cours",
            nullable: true,
            resolve: (parent) =>
              prisma.coursCategorie
                .findUnique({
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
        return prisma.cours.findUnique({
          where: { id: Number(args.coursId) },
        });
      },
    });

    t.field("utilisateurByEmail", {
      type: "Utilisateur",
      args: {
        email: stringArg({ nullable: false }),
      },
      resolve: (_, args) => {
        return prisma.utilisateur.findUnique({
          where: { email: Number(args.email) },
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

    t.field("createCategorie", {
      type: "Categorie",
      args: {
        libelle: stringArg({ nullable: false }),
      },
      resolve: (_, { libelle }, ctx) => {
        return prisma.categorie.create({
          data: {
            libelle,
          },
        });
      },
    });

    t.field("addCategorieMere", {
      type: "Categorie",
      args: {
        categorieId: stringArg(),
        categorieMereId: stringArg(),
      },
      resolve: (_, { categorieId, categorieMereId }, ctx) => {
        return prisma.categorie.update({
          where: { id: Number(categorieId) },
          data: { idCategorieMere: Number(categorieMereId) },
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
        contenuMd: stringArg(),
        resume: stringArg(),
        authorEmail: stringArg(),
      },
      resolve: (_, { titre, contenuMd, authorEmail, resume }, ctx) => {
        return prisma.cours.create({
    
          data: {
            titre,
            contenuMd,
            resume,
            dateRedaction: 123, 
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
const server = new ApolloServer({ cors: true, schema });
const startServer = server.start();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
  );
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
  );
  res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
  );
  if (req.method === "OPTIONS") {
      res.end();
      return false;
  }

  await startServer;
  await server.createHandler({
    path: "/api/server",
  })(req, res);
}