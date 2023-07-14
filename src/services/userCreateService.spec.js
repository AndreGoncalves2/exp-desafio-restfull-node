const UserCreateService = require("./userCreateService");
const UserRepositoryInMemory = require("../repositories/userRepositoryInMemory");
const AppError = require("../utils/appError");

describe("UserCreateService", () => {
    let userRepositoryInMemory = null;
    let userCreateService = null;

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        userCreateService = new UserCreateService(userRepositoryInMemory);
    });

    it("user should be created", async () => {
        const user = {
            name: "User test",
            email: "user@example.com",
            password: "1234"
        };
    
        const userCreated = await userCreateService.execute(user);
    
        expect(userCreated).toHaveProperty("id");
    });

    it("user not should be created with exists email", async () => {
        const user1 = {
            name: "user1",
            email: "user@example.com",
            password: "password1"
        };

        const user2 = {
            name: "user2",
            email: "user@example.com",
            password: "password2"
        };

        await userCreateService.execute(user1);

        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Email já esta em uso"));
    });
});
