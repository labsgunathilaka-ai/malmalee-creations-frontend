import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-lightBeige">
      {/* Header component eka methana call karanawa */}
      <Header />
      
      {/* Main content eka methanata passe enawa */}
      <main className="p-8">
        <h1 className="text-2xl font-bold text-darkPurple text-center mt-10">
          Welcome to Malmalee Creations
        </h1>
      </main>
    </div>
  )
}

export default App;