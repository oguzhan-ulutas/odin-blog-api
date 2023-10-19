import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";

const LoginPage = () => {
  return (
    <main>
      <Header />
      <div className="content-container">
        <form action="">
          <div>
            <label htmlFor="email">*E-mail: </label>
            <input type="email" placeholder="abc@abc.com" name="email" />
          </div>
          <div>
            <label htmlFor="password">*Password: </label>
            <input type="password" placeholder="1234" name="password" />
          </div>
          <button>Login</button>
        </form>
      </div>
      <Footer />
    </main>
  );
};

export default LoginPage;
