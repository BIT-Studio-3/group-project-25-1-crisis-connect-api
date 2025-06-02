import GenericRepository from "../../repositories/generic.js";

// Instantiate the GenericRepository with the 'user' model
const userRepository = new GenericRepository('user'); 

const createUser = async (req, res) => {
  try {
    // Create a new user
    const newUser = await userRepository.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      emailAddress: req.body.emailAddress,
    });

    // Send JSON response
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
// Add the following code under the createUser function
const getUsers = async (req, res) => {
  try {
    const filters = {
      firstName: req.body.firstName || undefined,
      lastName: req.body.lastName || undefined,
      role: req.body.role || undefined,
      emailAddress: req.body.emailAddress || undefined,
    }
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const users = await userRepository.findAll(filters, sortBy, sortOrder);

    // Check if there are no users
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userRepository.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: `No user record with the id: ${req.params.id} found`,
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
// Add the following code under the getUser function
const updateUser = async (req, res) => {
  try {
    let user = await userRepository.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: `No user record with the id: ${req.params.id} found`,
      });
    }

    user = await userRepository.update(req.params.id, {
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        emailAddress: req.body.emailAddress,
      },
    });

    return res.status(200).json({
      message: `User record with the id: ${req.params.id} successfully updated`,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Add the following code under the updateUser function
const deleteUser = async (req, res) => {
  try {
    const user = await userRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `No user record with the id: ${req.params.id} found`,
      });
    }
    await userRepository.delete(req.params.id);

    return res.json({
      message: `User record with the id: ${req.params.id} successfully deleted`,
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Add the following code under the deleteUser function
export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};