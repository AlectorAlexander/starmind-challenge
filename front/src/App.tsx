import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import ChatBot from "./components/ChatBot"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 p-0 m-0">
      <Header />
      <Main />
      <Footer />
      <ChatBot />
    </div>
  )
}

export default App
