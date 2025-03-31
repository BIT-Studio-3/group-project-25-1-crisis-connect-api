import prisma from "../prisma/client.js";

class DamageRepository {
  async create(data) {
    return await prisma.damage.create({ data });
  }

  async findAll() {
    return await prisma.damage.findMany();
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