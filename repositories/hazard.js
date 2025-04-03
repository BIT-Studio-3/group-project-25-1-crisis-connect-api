import prisma from "../prisma/client.js";

class HazardRepository {
  async create(data) {
    return await prisma.hazard.create({ data });
  }

  async findAll(filters = {}, sortBy = 'id', sortOrder = 'asc') {
    const query = {
      orderBy: {
        [sortBy]: sortOrder, // Sort by the specified column and order
      },
    };

    if (Object.keys(filters).length > 0) {
      query.where = {};
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          query.where[key] = { contains: value };
        }
      }
    }
    return await prisma.hazard.findMany(query);
  }

  async findById(id) {
    return await prisma.hazard.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return await prisma.hazard.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.hazard.delete({
      where: { id },
    });
  }
}

export default new HazardRepository();