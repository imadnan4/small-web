export type SeedSite = {
  address: string;
  title: string;
  author: string;
  html: string;
};

export const SEED_SITES: SeedSite[] = [
  {
    address: "tidepool.zz",
    title: "The Tide Pool Ledger",
    author: "Mina Farooq",
    html: `
      <h1>The Tide Pool Ledger</h1>
      <p>At low tide the north wall turns into a city with no streets. Hermit crabs move between rooms the size of a thumbnail, and every pool holds a different version of the afternoon.</p>
      <p>I started writing things down because I kept forgetting which pool had the orange starfish. Now the notebook has more crossings-out than observations. The useful notes are the ones about weather, not the animals.</p>
      <h2>What the ledger records</h2>
      <ul>
        <li>Water temperature, taken with a cheap thermometer.</li>
        <li>Which pools were sheltered from the wind.</li>
        <li>Anything that moved that I could identify without guessing.</li>
      </ul>
      <blockquote>A pool is not a small ocean. It is a small room that the ocean keeps leaving and returning to.</blockquote>
      <h2>From the notebook</h2>
      <p>The entries below are copied without correction. The crossings-out are left out. Where I wrote a guess, I have marked it as a guess, because the difference between a guess and an observation is the whole point of keeping a notebook.</p>
      <h3>12 October, 06:40</h3>
      <p>The north wall was sheltered and the water was still. I counted four anemones, two of them open. A small crab carried a shell that was too large for it and stopped every few inches to rest. The thermometer read 14 degrees, which is warmer than last week.</p>
      <h3>19 October, 07:10</h3>
      <p>Wind from the west, so the outer pools were choppy and the inner ones were clear. The orange starfish was in the third pool from the wall, exactly where it was in August. I am not sure whether starfish have habits or whether I have habits about starfish. Either way, I wrote it down.</p>
      <h3>26 October, 06:55</h3>
      <p>No starfish. The pool was full of small brown crabs and a piece of blue rope. The rope was not there last week. I walked the wall twice to make sure I was looking in the right place, then wrote down that I was looking in the right place and still did not see it.</p>
      <h3>2 November, 07:25</h3>
      <p>Cold enough that my hands were clumsy. The anemones were closed. A gull stood on the wall and watched me write, which is not an observation about the pool, but the notebook has room for it. The tide came in faster than the forecast said it would.</p>
      <h3>9 November, 06:50</h3>
      <p>The starfish is back. It has moved one pool to the left and is smaller than I remember, or I am remembering a different starfish. This is the problem with a ledger that does not include drawings. I have started carrying a pencil.</p>
      <p>Related: <a href="fieldnotes.zz">field notes from the same coast</a>, and the <a href="harbor.zz">harbor log</a>.</p>
      <p>The old harbor page I used to link to is <a href="old-harbor.zz">still not here</a>. I keep the link because the address is part of the story.</p>
    `,
  },
  {
    address: "fieldnotes.zz",
    title: "Field Notes from the Edge",
    author: "Mina Farooq",
    html: `
      <h1>Field Notes from the Edge</h1>
      <p>These are notes from the edge of the map, which is mostly a strip of grass, a fence, and a path that floods every spring.</p>
      <p>A friend keeps asking whether artificial intelligence can identify a bird from a bad photograph. I think it can identify the photograph. The bird is a harder question.</p>
      <h2>Three things worth writing down</h2>
      <ol>
        <li>The wind changes direction before the rain, not after it.</li>
        <li>Blackbirds are louder on Tuesdays. I have no explanation.</li>
        <li>The best path is usually the one that looks slightly wrong.</li>
      </ol>
      <p>I keep the <a href="tidepool.zz">tide pool ledger</a> nearby, and a page about <a href="technology.zz">small machines</a> in the back of the notebook. If the weather turns, I walk to the <a href="coffeehouse.zz">coffee house</a>.</p>
    `,
  },
  {
    address: "night-market.zz",
    title: "The Night Market",
    author: "Mina Farooq",
    html: `
      <h1>The Night Market</h1>
      <p>The market starts at six and ends when the last stall runs out of food. There is no website for the market, so this page is the website.</p>
      <p>Stall eleven sells dumplings. Stall four sells coffee strong enough to make you apologize to the cup. Between them is a woman who repairs watches and refuses to be photographed.</p>
      <h2>What to bring</h2>
      <ul>
        <li>Cash, because the card reader only works when it feels like it.</li>
        <li>A bag for the things you did not plan to buy.</li>
        <li>Patience for the noodle queue.</li>
      </ul>
      <p>Recipes from the market end up at <a href="kitchen.zz">the small kitchen</a>. The coffee stall keeps a page at <a href="coffeehouse.zz">the slow coffee house</a>. Someone promised to start a radio show from the market, but <a href="midnight-radio.zz">the address is empty</a>.</p>
    `,
  },
  {
    address: "coffeehouse.zz",
    title: "The Slow Coffee House",
    author: "Owen Blake",
    html: `
      <h1>The Slow Coffee House</h1>
      <p>We open at seven and close when the conversation runs out. There is no Wi-Fi password because there is no Wi-Fi. The sign by the door says so, in smaller letters than the coffee prices.</p>
      <p>The house blend changes every week. This week it is a washed Ethiopian coffee with a taste like apricot and a smell like the inside of a wooden drawer. Next week it will be something else. The point is to pay attention.</p>
      <h2>Brewing notes</h2>
      <pre><code>22 g coffee
360 g water at 94 C
bloom for 40 seconds
pour slowly, finish by 3:30</code></pre>
      <p>We buy pastries from the <a href="night-market.zz">night market</a> on Fridays. The owner writes <a href="fieldnotes.zz">field notes</a> on the back of receipts. On quiet afternoons we listen to <a href="radio-static.zz">radio static</a>.</p>
    `,
  },
  {
    address: "radio-static.zz",
    title: "Radio Static",
    author: "Owen Blake",
    html: `
      <h1>Radio Static</h1>
      <p>At night the shortwave radio finds stations that are not supposed to exist anymore. Most of them are weather reports. One is a man reading the names of ships.</p>
      <p>I started recording the static because it changes with the weather. The recordings are not useful. They are proof that something was there.</p>
      <h2>Frequencies worth trying</h2>
      <ul>
        <li>5.9 MHz after midnight, when the band opens up.</li>
        <li>7.1 MHz for the shipping forecast.</li>
        <li>Any frequency at all during a thunderstorm.</li>
      </ul>
      <p>The man who repairs the radio has a page at <a href="repair-manual.zz">repair manual</a>. I wrote about the receiver at <a href="technology.zz">small machines</a>. The station that never came back is <a href="midnight-radio.zz">midnight radio</a>.</p>
    `,
  },
  {
    address: "football.zz",
    title: "The Sunday League",
    author: "Priya Nair",
    html: `
      <h1>The Sunday League</h1>
      <p>Our football pitch is behind the community hall and slopes toward the river. In winter the far corner is a swamp. We play there anyway, because the league rules do not mention swamps.</p>
      <p>This season we have won two matches, drawn one, and lost the rest. The table says we are ninth. The table does not say that the goalkeeper is sixteen and has never played in goal before.</p>
      <h2>Match notes</h2>
      <ul>
        <li>Number nine cannot run for ninety minutes, so he runs for the first twenty.</li>
        <li>The wind is always against us in the second half.</li>
        <li>Tea after the match is more important than the result.</li>
      </ul>
      <p>The club secretary keeps the fixtures on <a href="technology.zz">a small machine</a>. The old ground is described in the <a href="harbor.zz">harbor log</a>. My cousin writes about the coast at <a href="tidepool.zz">the tide pool ledger</a>.</p>
    `,
  },
  {
    address: "technology.zz",
    title: "Small Machines",
    author: "Priya Nair",
    html: `
      <h1>Small Machines</h1>
      <p>The most interesting technology is the kind you can hold in one hand and almost understand. A radio. A mechanical watch. A bicycle with five gears and no ambition.</p>
      <p>I have been reading about artificial intelligence again. The useful parts are smaller than the headlines: a model that can sort photographs, a tool that can suggest a word, a system that can find a pattern in weather data. None of them know what the pattern means. That is still our job.</p>
      <h2>Rules for small machines</h2>
      <ol>
        <li>If it needs a firmware update to open a window, it is not a window.</li>
        <li>Prefer the thing that can be repaired with a screwdriver.</li>
        <li>Read the manual before you decide it is broken.</li>
      </ol>
      <h2>Three things on the bench</h2>
      <p>The first is a shortwave receiver from the 1970s. It has a dial that moves a needle across a printed card, and no memory of any kind. You have to know where a station was to find it again. This sounds like a limitation until you use a radio that remembers every station for you, and then it sounds like a kind of honesty.</p>
      <p>The second is a bicycle with five gears. The derailleur is slightly bent, so the chain skips in third. I could replace the derailleur, but the skipping is a useful reminder that the machine is not perfect and neither is the road. I have not replaced it.</p>
      <p>The third is a laptop with a broken fan. It runs for twenty minutes before it gets too hot to touch. The operating system says everything is fine. The operating system is not holding the laptop. I have ordered a fan and a small screwdriver, and I am reading the manual while I wait.</p>
      <p>The manual is at <a href="repair-manual.zz">repair manual</a>. The weather notes are at <a href="fieldnotes.zz">field notes</a>. The radio page is <a href="radio-static.zz">radio static</a>.</p>
    `,
  },
  {
    address: "harbor.zz",
    title: "Harbor Log",
    author: "Tomas Reed",
    html: `
      <h1>Harbor Log</h1>
      <p>The harbor is smaller than the photographs suggest. Two fishing boats, a fuel pump, a shed with a broken door, and a concrete wall where people sit in the evening.</p>
      <p>I log the boats that come in. Most days it is the same two. On Thursdays a third boat arrives with boxes of ice and a dog that refuses to leave the deck.</p>
      <h2>Entries</h2>
      <table>
        <thead><tr><th>Day</th><th>Boat</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Monday</td><td>Marea</td><td>Fuel, then out before noon.</td></tr>
          <tr><td>Wednesday</td><td>Pell</td><td>Nets drying on the wall.</td></tr>
          <tr><td>Thursday</td><td>Unknown</td><td>Ice, boxes, one dog.</td></tr>
        </tbody>
      </table>
      <p>The tide pools are described at <a href="tidepool.zz">the tide pool ledger</a>. The old harbor page is <a href="old-harbor.zz">gone</a>. The Sunday league plays up the road: <a href="football.zz">football</a>.</p>
    `,
  },
  {
    address: "repair-manual.zz",
    title: "Repair Manual",
    author: "Tomas Reed",
    html: `
      <h1>Repair Manual</h1>
      <p>Everything in this shed is waiting for a part. The shelf labels are older than the shelves. On the top shelf: switches. Below that: things that might be switches. Below that: a box marked "do not open".</p>
      <p>I fix radios, lamps, bicycles, and one very stubborn clock. The clock has been on the bench for three years. It is not broken anymore. It just does not keep time.</p>
      <h2>Before you throw it away</h2>
      <ul>
        <li>Unplug it. Wait longer than you think.</li>
        <li>Look for the thing that is loose before looking for the thing that is complicated.</li>
        <li>If it smells like burning, stop.</li>
      </ul>
      <p>The radio notes are at <a href="radio-static.zz">radio static</a>. The small machines are at <a href="technology.zz">technology</a>. The coffee is at <a href="coffeehouse.zz">the slow coffee house</a>. A page about the <a href="sunken-garden.zz">sunken garden</a> never got written.</p>
    `,
  },
  {
    address: "kitchen.zz",
    title: "The Small Kitchen",
    author: "Ayesha Khan",
    html: `
      <h1>The Small Kitchen</h1>
      <p>The kitchen has one counter, two burners, and a window that looks onto a wall. It is enough. Most of what I know about cooking came from standing here and paying attention.</p>
      <p>Tonight: rice, eggs, spring onions, and a spoonful of chili oil. The rice goes on first. The eggs go in when the pan is hot but not angry. The onions go in last so they stay bright.</p>
      <h2>Things I keep</h2>
      <ul>
        <li>Salt in a small bowl, because the box is too far away.</li>
        <li>A jar of chili oil with a spoon that does not fit.</li>
        <li>The market list, folded twice.</li>
      </ul>
      <p>The list comes from <a href="night-market.zz">the night market</a>. The notes come from <a href="fieldnotes.zz">field notes</a>. The coffee is next door at <a href="coffeehouse.zz">the slow coffee house</a>.</p>
    `,
  },
];
