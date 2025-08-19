export const dashboardData = {
  visitors: [148, 298, 193, 335, 297, 308, 385, 481, 802, 752, 940, 1175],
  signups: [1, 4, 3, 17, 19, 18, 26, 33, 42, 54, 70, 89],
  mrr: [14, 0, 0, 0, 0, 0, 39, 76, 129, 196, 265, 366],
  currentMRR: 1253,
  currentARR: 15036,
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
}

export const generateLiveStats = () => ({
  activeNow: Math.floor(Math.random() * 50) + 10,
  last24Hours: Math.floor(Math.random() * 1000) + 500,
  cardsCreated: Math.floor(Math.random() * 500) + 100
})