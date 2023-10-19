import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";

const SignupPage = () => {
  return (
    <main>
      <Header />
      <div className="content-container">
        <form action="">
          <div>
            <label htmlFor="firstname">*First Name: </label>
            <input type="text" placeholder="Sarah..." name="firstname" />
          </div>
          <div>
            <label htmlFor="lastname">*Last Name: </label>
            <input type="text" placeholder="Brown..." name="lastname" />
          </div>
          <div>
            <label htmlFor="email">*E-mail: </label>
            <input type="email" placeholder="abc@abc.com" name="email" />
          </div>
          <div>
            <label htmlFor="password">*Password: </label>
            <input type="password" placeholder="1234" name="password" />
          </div>
          <button>Signup</button>
        </form>
      </div>
      <Footer />
    </main>
  );
};

export default SignupPage;
