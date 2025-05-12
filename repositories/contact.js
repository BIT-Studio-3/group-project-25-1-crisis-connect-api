import prisma from "../prisma/client.js";

class ContactRepository {
  async create(data) {
    return await prisma.contact.create({ data });
  }

  async findAll(filters = {}, sortBy = 'id', sortOrder = 'asc') {
    const query = {
      orderBy: {
        [sortBy]: sortOrder,
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
    return await prisma.contact.findMany(query);
  }

  async findById(id) {
    return await prisma.contact.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return await prisma.contact.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.contact.delete({
      where: { id },
    });
  }
}

export default new ContactRepository();