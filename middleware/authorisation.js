import prisma from "../../prisma/client.js";

const authorisation = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id: id } });

    // Check if the user is an admin
    if (user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Not authorized to access this route",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export default authorisation;