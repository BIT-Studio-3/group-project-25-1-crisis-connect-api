import prisma from "../prisma/client.js";

class HazardRepository {
  async create(data) {
    return await prisma.hazard.create({ data });
  }

  async findAll() {
    return await prisma.hazard.findMany();
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