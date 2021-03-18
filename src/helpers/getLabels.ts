const getLabels = () => {
  return localStorage.notesLabels ? JSON.parse(localStorage.notesLabels) : [];
};

export default getLabels;
