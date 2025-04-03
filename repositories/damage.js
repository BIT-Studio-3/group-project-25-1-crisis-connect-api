import prisma from "../prisma/client.js";

class DamageRepository {
  async create(data) {
    return await prisma.damage.create({ data });
  }

  async findAll(filters={}, sortBy = "id", sortOrder = "asc") {
    const query = {
      orderBy: {
        [sortBy]: sortOrder, // Sort by the specified column and order
      },
    };

    if (Object.keys(filters).length > 0) {
      query.where = {};
      // Loop through the filters and apply them dynamically
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          query.where[key] = { contains: value, mode: "insensitive" };
        }
      }
    }
    return await prisma.damage.findMany(query);
}

  async findById(id) {
    return await prisma.damage.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return await prisma.damage.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.damage.delete({
      where: { id },
    });
  }
}

export default new DamageRepository();