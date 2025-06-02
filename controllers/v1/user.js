import GenericRepository from "../../repositories/generic.js";

// Instantiate the GenericRepository with the 'user' model
const userRepository = new GenericRepository('user');

const createUser = async (req, res) => {
  try {
    await userRepository.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        emailAddress: req.body.emailAddress,
      },
    });

    const newUser = await userRepository.findAll();

    return res.status(201).json({
      message: "User successfully created",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userRepository.findAll();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ data: users });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userRepository.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({
        message: `No user with the id: ${req.params.id} found`,
      });
    }

    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let user = await userRepository.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({
        message: `No user with the id: ${req.params.id} found`,
      });
    }

    user = await userRepository.update({
      where: { id: req.params.id },
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        emailAddress: req.body.emailAddress,
      },
    });

    return res.status(200).json({
      message: `User with the id: ${req.params.id} successfully updated`,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userRepository.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({
        message: `No user with the id: ${req.params.id} found`,
      });
    }

    await userRepository.delete({
      where: { id: req.params.id },
    });

    return res.json({
      message: `User with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
