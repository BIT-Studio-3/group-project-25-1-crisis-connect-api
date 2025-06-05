// repositories/genericRepository.js
import prisma from "../prisma/client.js";

class GenericRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    return await prisma[this.model].create({ 
      data 
    });
  }

  async findAll(filters = {}, sortBy = "id", sortOrder = "asc") {
    const query = {
      orderBy: {
        [sortBy]: sortOrder, // Sort by the specified column and order
    this.model = model;  // Accept the model dynamically (e.g., hazard, contact, etc.)
  }

  // Create a new record
  async create(data) {
    return await prisma[this.model].create({
      data,
    });
  }

  // Find all records with optional filters, sorting
  async findAll(filters = {}, sortBy = 'id', sortOrder = 'asc') {
    const query = {
      orderBy: {
        [sortBy]: sortOrder,
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
    return await prisma[this.model].findMany(query);
  }
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          query.where[key] = { contains: value };
        }
      }
    }
    
    return await prisma[this.model].findMany(query);
  }

  // Find a record by ID
  async findById(id) {
    return await prisma[this.model].findUnique({
      where: { id },
    });
  }

  // Update a record by ID
  async update(id, data) {
    return await prisma[this.model].update({
      where: { id },
      data,
    });
  }

  // Delete a record by ID
  async delete(id) {
    return await prisma[this.model].delete({
      where: { id },
    });
  }
}

export default GenericRepository;
