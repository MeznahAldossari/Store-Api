import { user_details, user_operations } from "../../models/user";

const user_Model = new user_operations();

describe("User", () => {
  const Userobj: user_details = {
    username: "meznahAldossari",
    firstname: "meznah",
    lastname: "aldossari",
    user_password: "123",
  };
  it("Create New User", async () => {
    const newUser = await user_Model.create(Userobj);
    expect(newUser.username).toEqual("meznahAldossari");
  });

  it("Update User", async () => {
    const newUser = await user_Model.updata_user({
      id: 1,
      username: "Tester",
      firstname: "meznah",
      lastname: "aldossari",
      user_password: "9120",
    });
    expect(newUser.username).toEqual("Tester");
  });

  it("Retrive Specific User", async () => {
    const userid = await user_Model.display_specific_user(1);
    expect(userid.id).toEqual(1);
  });

  it("Retrive All Users", async () => {
    const allproducts = await user_Model.display_all_users();
    expect(allproducts.length).toEqual(1);
  });

  it("Authentication", async () => {
    const authUser = await user_Model.userAuthentication("Tester", "9120");
    expect(authUser?.username).toBe("Tester");
    expect(authUser?.firstname).toBe("meznah");
    expect(authUser?.lastname).toBe("aldossari");
  });

  it("Delete Specific user", async () => {
    await user_Model.delete_user(1);
    expect(await user_Model.display_all_users()).toEqual([]);
  });
});
