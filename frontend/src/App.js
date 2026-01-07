import { BrowserRouter, Routes, Route,Navigate  } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import AdminHome from './pages/AdminHome'
import VoterHome from './pages/VoterHome'
import CandidateDetails from './pages/CandidateDetails'
import AdminElectionDetails from './pages/AdminElectionDetails'
import AddCandidates from './pages/AddCandidates'
import VoterList from './pages/VoterList'
import ManageElections from './pages/ManageElections'
import CandidatesByElection from './pages/CandidatesByElection'
import VoterCandidatesByElection from './pages/VoterCandidatesByElection'
// import Results from './pages/Results'
import ThankYou from './pages/ThankYou';
import AdminResults from './pages/AdminResults';
import VoterResults from './pages/VoterResults';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/voter" element={<VoterHome />} />
        <Route path="/candidates/:id" element={<CandidateDetails />} />
        <Route path="/admin-election-details" element={<AdminElectionDetails />} />
        <Route path="/add-candidates" element={<AddCandidates />} />
        <Route path="/voter-list" element={<VoterList />} />
        <Route path="/manage-elections" element={<ManageElections />} />
        <Route path="/admin-candidates/:electionId" element={<CandidatesByElection />} />
        <Route path="/voter-candidates/:electionId" element={<VoterCandidatesByElection />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/results-page" element={<AdminResults />} />
        <Route path="/voter-results" element={<VoterResults />} />
        {/* <Route path="/results/:electionId" element={<Results />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
