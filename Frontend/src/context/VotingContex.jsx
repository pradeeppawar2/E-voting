import React, { createContext, useState, useContext } from "react";

const VotingContext = createContext();

export const useVoting = () => useContext(VotingContext);

export const VotingProvider = ({ children }) => {
  const [hasVoted, setHasVoted] = useState(false);

  const castVote = () => {
    setHasVoted(true);
  };

  return (
    <VotingContext.Provider value={{ hasVoted, castVote }}>
      {children}
    </VotingContext.Provider>
  );
};
