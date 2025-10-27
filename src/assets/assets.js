import chatGpt from "../assets/chatgpt.png";
import chatGpt5 from "../assets/gpt5.png";
import google from "../assets/google.png";
import deepseek from "../assets/deepseek.png";
import claude from "../assets/claude.png";
import grok from "../assets/grok.png";
import logo from "../assets/logo.png";
import lisaCasualSitting from "../assets/Avatars/lisa-casual-sitting-thumbnail.png";
import lisaCasualStanding from "../assets/Avatars/lisa-causal-standing-thumbnail.png";
import lisaGracefulSitting from "../assets/Avatars/lisa-graceful-sitting-thumbnail.png";
import lisaGracefulStanding from "../assets/Avatars/lisa-graceful-standing-thumbnail.png";
import lisaTechnicalSitting from "../assets/Avatars/lisa-technical-sitting-thumbnail.png";
import lisaTechnicalStanding from "../assets/Avatars/lisa-technical-standing-thumbnail.png";
import loriCasual from "../assets/Avatars/lori-casual-thumbnail.png";
import loriGraceful from "../assets/Avatars/lori-graceful-thumbnail.png";
import loriFormal from "../assets/Avatars/lori-formal-thumbnail.png";
import harryCasual from "../assets/Avatars/harry-casual-thumbnail.png";
import harryBusiness from "../assets/Avatars/harry-business-thumbnail.png";
import harryYouthful from "../assets/Avatars/harry-youthful-thumbnail.png";
import maxCasual from "../assets/Avatars/max-casual-thumbnail.png";
import maxBusiness from "../assets/Avatars/max-business-thumbnail.png";
import maxFormal from "../assets/Avatars/max-formal-thumbnail.png";
import megCasual from "../assets/Avatars/meg-casual-thumbnail.png";
import megBusiness from "../assets/Avatars/meg-business-thumbnail.png";
import megFormal from "../assets/Avatars/meg-formal-thumbnail.png";
import jeffBusiness from "../assets/Avatars/jeff-business-thumbnail.png";
import jeffFormal from "../assets/Avatars/jeff-formal-thumbnail.png";
export const models = {
  chatGpt,
  chatGpt5,
  claude,
  google,
  deepseek,
  grok,
};
export default logo;

export const modalToIcon = {
  "GPT-4": chatGpt,
  gpt4: chatGpt,
  "GPT-5": chatGpt5,
  Deepseek: deepseek,
  Grok: grok,
};

export const avatars = [
  {
    name: "Lisa",
    img: lisaCasualSitting,
    avatarTalkingStyle: "casual-sitting",
  },
  {
    name: "Lisa",
    img: lisaCasualStanding,
    avatarTalkingStyle: "casual-standing",
  },
  {
    name: "Lisa",
    img: lisaGracefulSitting,
    avatarTalkingStyle: "graceful-sitting",
  },
  {
    name: "Lisa",
    img: lisaGracefulStanding,
    avatarTalkingStyle: "graceful-standing",
  },
  {
    name: "Lisa",
    img: lisaTechnicalSitting,
    avatarTalkingStyle: "technical-sitting",
  },
  {
    name: "Lisa",
    img: lisaTechnicalStanding,
    avatarTalkingStyle: "technical-standing",
  },
  {
    name: "Lori",
    img: loriCasual,
    avatarTalkingStyle: "casual",
  },
  {
    name: "Lori",
    img: loriFormal,
    avatarTalkingStyle: "formal",
  },
  {
    name: "Lori",
    img: loriGraceful,
    avatarTalkingStyle: "graceful",
  },
  {
    name: "Harry",
    img: harryCasual,
    avatarTalkingStyle: "casual",
  },
  {
    name: "Harry",
    img: harryBusiness,
    avatarTalkingStyle: "business",
  },
  {
    name: "Harry",
    img: harryYouthful,
    avatarTalkingStyle: "youthful",
  },
  {
    name: "Max",
    img: maxCasual,
    avatarTalkingStyle: "casual",
  },
  {
    name: "Max",
    img: maxBusiness,
    avatarTalkingStyle: "business",
  },
  {
    name: "Max",
    img: maxFormal,
    avatarTalkingStyle: "formal",
  },
  {
    name: "Meg",
    img: megCasual,
    avatarTalkingStyle: "casual",
  },
  {
    name: "Meg",
    img: megBusiness,
    avatarTalkingStyle: "business",
  },
  {
    name: "Meg",
    img: megFormal,
    avatarTalkingStyle: "formal",
  },
  {
    name: "Jeff",
    img: jeffBusiness,
    avatarTalkingStyle: "business",
  },
  {
    name: "Jeff",
    img: jeffFormal,
    avatarTalkingStyle: "youthful",
  },
];
export const languagesToVoices = [
  {
    locale: "en-US",
    language: "English (United States)",
    voices: [
      { name: "AvaMultilingual", gender: "Female" },
      { name: "AndrewMultilingual", gender: "Male" },
      { name: "EmmaMultilingual", gender: "Female" },
      { name: "AlloyTurboMultilingual", gender: "Male" },
      { name: "EchoTurboMultilingual", gender: "Male" },
      { name: "FableTurboMultilingual", gender: "Neutral" },
      { name: "OnyxTurboMultilingual", gender: "Male" },
      { name: "NovaTurboMultilingual", gender: "Female" },
      { name: "ShimmerTurboMultilingual", gender: "Female" },
      { name: "BrianMultilingual", gender: "Male" },
      { name: "Ava", gender: "Female" },
      { name: "Andrew", gender: "Male" },
      { name: "Emma", gender: "Female" },
      { name: "Brian", gender: "Male" },
      { name: "Jenny", gender: "Female" },
      { name: "Guy", gender: "Male" },
      { name: "Aria", gender: "Female" },
      { name: "Davis", gender: "Male" },
      { name: "Jane", gender: "Female" },
      { name: "Jason", gender: "Male" },
      { name: "Kai", gender: "Male" },
      { name: "Luna", gender: "Female" },
      { name: "Sara", gender: "Female" },
      { name: "Tony", gender: "Male" },
      { name: "Nancy", gender: "Female" },
      { name: "CoraMultilingual", gender: "Female" },
      { name: "ChristopherMultilingual", gender: "Male" },
      { name: "BrandonMultilingual", gender: "Male" },
      { name: "Amber", gender: "Female" },
      { name: "Ana", gender: "Female (Child)" },
      { name: "Ashley", gender: "Female" },
      { name: "Brandon", gender: "Male" },
      { name: "Christopher", gender: "Male" },
      { name: "Cora", gender: "Female" },
      { name: "Elizabeth", gender: "Female" },
      { name: "Eric", gender: "Male" },
      { name: "Jacob", gender: "Male" },
      { name: "JennyMultilingual", gender: "Female" },
      { name: "Michelle", gender: "Female" },
      { name: "Monica", gender: "Female" },
      { name: "Roger", gender: "Male" },
      { name: "RyanMultilingual", gender: "Male" },
      { name: "SteffanMultilingual", gender: "Male" },
      { name: "Steffan", gender: "Male" },
      { name: "AdamMultilingual", gender: "Male" },
      { name: "AIGenerate1", gender: "Male" },
      { name: "AIGenerate2", gender: "Female" },
      { name: "AmandaMultilingual", gender: "Female" },
      { name: "AshTurboMultilingual", gender: "Male" },
      { name: "Blue", gender: "Neutral" },
      { name: "DavisMultilingual", gender: "Male" },
      { name: "DerekMultilingual", gender: "Male" },
      { name: "DustinMultilingual", gender: "Male" },
      { name: "EvelynMultilingual", gender: "Female" },
      { name: "LewisMultilingual", gender: "Male" },
      { name: "LolaMultilingual", gender: "Female" },
      { name: "NancyMultilingual", gender: "Female" },
      { name: "PhoebeMultilingual", gender: "Female" },
      { name: "SamuelMultilingual", gender: "Male" },
      { name: "SerenaMultilingual", gender: "Female" },
      { name: "Adam:DragonHDLatest", gender: "Male" },
      { name: "Andrew:DragonHDLatest", gender: "Male" },
      { name: "Andrew2:DragonHDLatest", gender: "Male" },
      { name: "Ava:DragonHDLatest", gender: "Female" },
      { name: "Brian:DragonHDLatest", gender: "Male" },
      { name: "Davis:DragonHDLatest", gender: "Male" },
      { name: "Emma:DragonHDLatest", gender: "Female" },
      { name: "Emma2:DragonHDLatest", gender: "Female" },
      { name: "Steffan:DragonHDLatest", gender: "Male" },
      { name: "Alloy:DragonHDLatest", gender: "Male" },
      { name: "Andrew3:DragonHDLatest", gender: "Male" },
      { name: "Aria:DragonHDLatest", gender: "Female" },
      { name: "Ava3:DragonHDLatest", gender: "Female" },
      { name: "Bree:DragonHDLatest", gender: "Female" },
      { name: "Jane:DragonHDLatest", gender: "Female" },
      { name: "Jenny:DragonHDLatest", gender: "Female" },
      { name: "MultiTalker-Ava-Andrew:DragonHDLatest", gender: "Neutral" },
      { name: "MultiTalker-Ava-Steffan:DragonHDLatest", gender: "Neutral" },
      { name: "Nova:DragonHDLatest", gender: "Female" },
      { name: "Phoebe:DragonHDLatest", gender: "Female" },
      { name: "Serena:DragonHDLatest", gender: "Female" },
    ],
  },
  {
    locale: "en-IN",
    language: "English (India)",
    voices: [
      { name: "AartiIndic", gender: "Female" },
      { name: "ArjunIndic", gender: "Male" },
      { name: "NeerjaIndic", gender: "Female" },
      { name: "PrabhatIndic", gender: "Male" },
      { name: "Aarav", gender: "Male" },
      { name: "Aashi", gender: "Female" },
      { name: "Aarti", gender: "Female" },
      { name: "Arjun", gender: "Male" },
      { name: "Ananya", gender: "Female" },
      { name: "Kavya", gender: "Female" },
      { name: "Kunal", gender: "Male" },
      { name: "Neerja", gender: "Female" },
      { name: "Prabhat", gender: "Male" },
      { name: "Rehaan", gender: "Male" },
    ],
  },
  {
    locale: "en-AU",
    language: "English (Australia)",
    voices: [
      { name: "Natasha", gender: "Female" },
      { name: "William", gender: "Male" },
      { name: "WilliamMultilingual", gender: "Male" },
      { name: "Annette", gender: "Female" },
      { name: "Carly", gender: "Female" },
      { name: "Darren", gender: "Male" },
      { name: "Duncan", gender: "Male" },
      { name: "Elsie", gender: "Female" },
      { name: "Freya", gender: "Female" },
      { name: "Joanne", gender: "Female" },
      { name: "Ken", gender: "Male" },
      { name: "Kim", gender: "Female" },
      { name: "Neil", gender: "Male" },
      { name: "Tim", gender: "Male" },
      { name: "Tina", gender: "Female" },
    ],
  },
  {
    locale: "hi-IN",
    language: "Hindi (India)",
    voices: [
      { name: "Aarav", gender: "Male" },
      { name: "Ananya", gender: "Female" },
      { name: "Aarti", gender: "Female" },
      { name: "Arjun", gender: "Male" },
      { name: "Kavya", gender: "Female" },
      { name: "Kunal", gender: "Male" },
      { name: "Rehaan", gender: "Male" },
      { name: "Swara", gender: "Female" },
      { name: "Madhur", gender: "Male" },
    ],
  },
];
