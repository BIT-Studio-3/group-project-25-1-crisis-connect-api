// Add the following code under import prisma from "../prisma/client.js";
const createUser = async (req, res) => {
  // Try/catch blocks are used to handle exceptions
  try {
    // Create a new institution
    await prisma.user.create({
      // Data to be inserted
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        email: req.body.email,
      },
    });

    // Get all institutions from the institution table
    const newuser = await prisma.user.findMany();

    // Send a JSON response
    return res.status(201).json({
      message: "User successfully created",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
// Add the following code under the createInstitution function
const getUsers = async (req, res) => {
  try {
    const user = await prisma.user.findMany();

    // Check if there are no institutions
    if (!user) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
// Add the following code under the getInstitutions function
const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    // Check if there is no institution
    if (!user) {
      return res.status(404).json({
        message: `No user with the id: ${req.params.id} found`,
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
// Add the following code under the getInstitution function
const updateUser = async (req, res) => {
  try {
    // Find the institution by id
    let user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    // Check if there is no institution
    if (!user) {
      return res.status(404).json({
        message: `No user with the id: ${req.params.id} found`,
      });
    }

    // Update the institution
    user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        // Data to be updated
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        email: req.body.email,
      },
    });

    return res.status(200).json({
      message: `Institution with the id: ${req.params.id} successfully updated`,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
// Add the following code under the updateInstitution function
const deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({
        message: `No institution with the id: ${req.params.id} found`,
      });
    }

    await prisma.user.delete({
      where: { id: req.params.id },
    });

    return res.json({
      message: `User with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
// Add the following code under the deleteInstitution function
export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};