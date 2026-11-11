export const TIERS = [
  { id: "bare", name: "Bare Minimum", price: 0, emoji: "🙄", blurb: "lowercase. no effort. vibes." },
  { id: "standard", name: "Standard Sorry", price: 2, emoji: "😔", blurb: "A sincere, short paragraph." },
  { id: "grovel", name: "Full Grovel", price: 5, emoji: "😭", blurb: "Long. Desperate. Over-explains." },
  { id: "shakespeare", name: "Shakespearean", price: 10, emoji: "🎭", blurb: "A dramatic sonnet + narration.", audio: true },
  { id: "corporate", name: "Corporate Crisis", price: 25, emoji: "📰", blurb: "PR non-apology press release + newsreader.", audio: true },
];

export function apology(tier, to, did) {
  to = (to || "you").trim(); did = (did || "the thing").trim();
  switch (tier) {
    case "bare":
      return `${to.toLowerCase()} my bad about ${did.toLowerCase()} i guess. anyway`;
    case "standard":
      return `Dear ${to},\n\nI'm genuinely sorry that I ${did}. That wasn't fair to you, and I should have known better. I hope you can forgive me, and I promise to do better.\n\nSincerely sorry.`;
    case "grovel":
      return `Dear ${to},\n\nI am writing this on my knees. Metaphorically. Also literally — my knees hurt now, which I deserve.\n\nI ${did}. I know. I KNOW. I have replayed it 400 times in the shower, twice during dinner, and once in a dream where you were a disappointed owl.\n\nIn my defence — no. I have no defence. I drafted a defence and then deleted it, and then I apologised to the draft for deleting it.\n\nI've told my mum. She took your side. My houseplants have stopped making eye contact with me. Even my Wi-Fi seems weaker, as if it knows.\n\nPlease let me make it up to you. I will bring snacks. Good snacks. Not the ones from the back of the cupboard.\n\nForever grovelling,\nYour deeply, deeply sorry friend\n\nP.S. Sorry for the length of this letter.\nP.P.S. Sorry for the P.S.`;
    case "shakespeare":
      return `A Sonnet of Contrition, for ${to}\n\nO ${to}, light of every waking morn,\nForgive the wretch who standeth here so low;\nFor I ${did}, and now am I forlorn,\nA fool whose folly all the heavens know.\n\nThe stars themselves did dim to see my shame,\nThe moon withdrew behind a cloud of grief,\nThe very ravens croak'd my sorry name,\nAnd begg'd thee grant this villain some relief.\n\nWhat devil whisper'd in mine ear that day?\nWhat madness seiz'd my hand, my tongue, my wits?\nI'd trade my kingdom — or at least my pay —\nTo mend the heart my blunder rent to bits.\n\nSo pardon, sweet ${to}, this humble plea:\nThe fault is mine; the mercy rests with thee.`;
    case "corporate":
      return `FOR IMMEDIATE RELEASE\n\nSTATEMENT REGARDING RECENT EVENTS INVOLVING ${to.toUpperCase()}\n\nWe are aware of reports that mistakes may have been made in connection with an incident in which it is alleged that I ${did}.\n\nAt this time, we want to be clear: we take ${to}'s feelings extremely seriously, and we regret any perceived inconvenience that may or may not have occurred.\n\nOut of an abundance of caution, we have launched a full internal review, led by me, of my own conduct. Preliminary findings suggest that lessons will be learned.\n\nWe remain committed to our core values of synergy, accountability, and moving forward. No further questions will be taken at this time.\n\n— Office of the Person Responsible\n\n###`;
  }
  return "";
}
