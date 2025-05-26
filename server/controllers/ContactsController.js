import User from "../models/UserModel.js";
export const searchContacts = async (request, response, next) => {
  try {
    const { searchTerm } = request.body;

    if (!searchTerm) {
      return response.status(400).send("SearchTerm is required");
    }

    const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(sanitizedSearchTerm, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: request.userId } },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    });

    console.log("Contacts found:", contacts.length);

    return response.status(200).json({ contacts });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return response.status(500).send("Logout Internal Server Error");
  }
};
