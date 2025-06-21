// import { hash } from "bcryptjs";

import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.imagePets.deleteMany();
  await prisma.petPost.deleteMany();
  await prisma.user.deleteMany();

  const password = await hash("Gordaluna123", 10);
  // const password = "Gordaluna123";
  // Crear usuario de prueba
  const user = await prisma.user.create({
    data: {
      name: "Fer Dev",
      email: "fer@mail.com",
      password,
      role: "USER",
      isBlocked: false,
    },
  });
  // Creamos una publicación de mascota en adopción

  await Promise.all([
    prisma.petPost.create({
      data: {
        title: "Cachorrita busca hogar",
        description:
          "Encontramos esta perrita cerca del parque, es muy dulce y está en buen estado.",
        type: "FOUND",
        species: "PERRO",
        breed: "Labrador",
        age: "6 meses",
        location: "Buenos Aires, Palermo",
        status: "ACTIVE",
        userId: user.id,
        image: {
          create: [
            {
              url: "https://placedog.net/500",
              publicId: "placedog.net/500", // Imagen de prueba
            },
            {
              url: "https://placedog.net/501",
              publicId: "placedog.net/501",
            },
          ],
        },
      },
    }),

    prisma.petPost.create({
      data: {
        title: "Gatito para adoptar",
        description: "Fue rescatado de la calle, es muy juguetón y está sano.",
        type: "ADOPTION",
        species: "GATO",
        breed: "Mestizo",
        age: "3 meses",
        location: "Buenos Aires, Almagro",
        status: "ACTIVE",
        userId: user.id,
        image: {
          create: [
            {
              url: "https://placecats.com/millie/500/500",
              publicId: "placecats.com/millie/500/50",
            },
          ],
        },
      },
    }),

    prisma.petPost.create({
      data: {
        title: "¿Alguien vio a Nina?",
        description:
          "Se escapó del jardín ayer por la tarde. Es muy sociable y tiene un arnés celeste.",
        type: "LOST",
        species: "PERRO",
        breed: "Border Collie",
        age: "3 años",
        location: "Buenos Aires, Villa Urquiza",
        status: "ACTIVE",
        userId: user.id,
        image: {
          create: [
            { url: "https://placedog.net/503", publicId: "placedog.net/503" },
            { url: "https://placedog.net/504", publicId: "placedog.net/5041" },
          ],
        },
      },
    }),

    prisma.petPost.create({
      data: {
        title: "Buscando a Tomás",
        description:
          "Se perdió cerca de la estación de tren. Tiene collar rojo y responde a su nombre.",
        type: "LOST",
        species: "GATO",
        breed: "Siames",
        age: "2 años",
        location: "Buenos Aires, Retiro",
        status: "ACTIVE",
        userId: user.id,
        image: {
          create: [
            {
              url: "https://placecats.com/millie_neo/500/500",
              publicId: "placecats.com/millie_neo/500/5001",
            },
            {
              url: "https://placecats.com/neo_banana/500/500",
              publicId: "placecats.com/neo_banana/500/5002",
            },
          ],
        },
      },
    }),
  ]);

  // Otro usuario admin con post de adopción
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: "adminhashedpassword",
      role: "ADMIN",
    },
  });

  await prisma.petPost.create({
    data: {
      title: "Gatito para adopción",
      description: "Fue rescatado de la calle, es muy cariñoso y limpio.",
      type: "ADOPTION",
      species: "GATO",
      breed: "Siamés",
      age: "1 año",
      location: "CABA, Villa Urquiza",
      status: "ACTIVE",
      userId: admin.id,
      image: {
        create: [
          {
            url: "https://placecats.com/bella/500/500",
            publicId: "placecats.com/bella/500/5005",
          },
        ],
      },
    },
  });

  console.log("🌱 Seed completado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
