/**
 * Ashley & Jonathan — Wedding Website Configuration
 * --------------------------------------------------
 * Update any field below as wedding details are finalized.
 * Changes automatically flow into the hero, countdown, calendar download,
 * schedule, and venue sections.
 */
window.WEDDING_CONFIG = {
  couple: {
    partnerOne: "Ashley",
    partnerTwo: "Jonathan",
    monogram: "A & J",
    domain: "https://ashleyandjonathan.com",
    email: "ashleyandjonathansamuel@gmail.com"
  },

  date: {
    // Flip to true once your exact date is locked in
    confirmed: false,
    // Display label shown across the hero, details, and footer
    displayLabel: "Fall 2027",
    // ISO target timestamp for the live countdown (Central Time, Austin TX)
    // Currently set to Saturday, October 2, 2027 at 4:30 PM CDT as a Fall 2027 target
    countdownTargetISO: "2027-10-02T16:30:00-05:00",
    countdownCaption: "Counting down to Fall 2027 · Final date announced soon",
    confirmedCountdownCaption: "Until we say I do in the Texas Hill Country",
    // Calendar (.ics) export details
    icsStartUTC: "20271002T213000Z",
    icsEndUTC: "20271003T040000Z"
  },

  location: {
    shortLabel: "Austin, Texas",
    regionLabel: "Austin & Texas Hill Country",
    venueName: "Texas Hill Country Estate",
    venueStatus: "Venue Announcement Coming Soon",
    venueAddress: "Greater Austin & Hill Country, Texas",
    venueDescription:
      "We are currently touring our favorite estates nestled among the rolling hills, limestone courtyards, and ancient live oaks of the Texas Hill Country just outside Austin. As soon as our venue is finalized, full address, driving directions, parking, and nearby hotel blocks will be shared right here.",
    // Add your Google Maps URL once the venue is booked to activate the live directions button
    venueMapUrl: "",
    nearestAirport: "Austin-Bergstrom International Airport (AUS)",
    attire: "Formal / Traditional or Black-Tie Optional · Details to follow"
  },

  scheduleNote:
    "Exact times and formal invitation details will be shared here once our venue and date are finalized.",

  schedule: [
    {
      day: "Evening Before",
      title: "Welcome Dinner",
      time: "Time to be announced",
      location: "Austin, Texas",
      description:
        "An intimate evening of warm conversation, good food, and celebration to welcome family and friends traveling from near and far."
    },
    {
      day: "Wedding Day",
      title: "The Ceremony",
      time: "Late Afternoon",
      location: "Texas Hill Country · Venue TBA",
      description:
        "Join us beneath the Texas Hill Country sky as we exchange our vows surrounded by the people we love most."
    },
    {
      day: "Wedding Day",
      title: "Cocktail Hour",
      time: "Following the Ceremony",
      location: "Courtyard & Terrace",
      description:
        "Golden hour drinks, passed hors d'oeuvres, and music on the terrace while we capture sunset portraits."
    },
    {
      day: "Wedding Day",
      title: "Dinner & Dancing",
      time: "Evening Reception",
      location: "Reception Hall & Courtyard",
      description:
        "A candlelit dinner, heartfelt toasts, and a full dance floor celebrating late into the Texas evening."
    }
  ]
};
