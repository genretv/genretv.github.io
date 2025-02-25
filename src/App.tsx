import SettingsIcon from "@mui/icons-material/Settings";
import { Box, IconButton } from "@mui/material";
import { PGliteInterface } from "@electric-sql/pglite";
import { PGliteWorker } from "@electric-sql/pglite/worker";
import { PGliteWithLive, live } from "@electric-sql/pglite/live";
import { useEffect, useState } from "react";
import "./App.css";
import Config from "./Config";
import Tables from "./Tables";
import Loading from "./Loading";

export type PGliteWorkerWithLive = PGliteWorker & PGliteWithLive;

// PGliteWorker & PGliteWithLive

let worker: Worker;
async function createPGlite(): Promise<PGliteWorkerWithLive> {
  worker = new Worker(new URL("./pglite-worker.ts", import.meta.url), {
    type: "module",
  });
  return PGliteWorker.create(worker, {
    extensions: {
      live,
      // sync: electricSync(),
    },
  });
}
const pgPromise = createPGlite();
export default function App() {
  const [showConfig, setShowConfig] = useState(false);
  const [pgForProvider, setPgForProvider] = useState<PGliteWorkerWithLive | null>(null);

  useEffect(() => {
    pgPromise.then(async (pg) => {
      setPgForProvider(pg);
      // const db = drizzle(pg as unknown as PGlite, { schema });
      // setDbs(pg as unknown as PGlite, db);
      // setDrizzleForProvider(db);
    });

    // if (session && !syncStarted) {
    //   pgPromise.then(async (pg) => {
    //     async function changer(session: Session) {
    //       console.log("Inside the changer", session, pg.isLeader, syncStarted, worker);
    //       if (pg.isLeader && !syncStarted) {
    //         if (!pgForProvider) {
    //           setPgForProvider(pg);
    //         }
    //         syncStarted = true;
    //         if (!!worker) {
    //           worker.postMessage({ type: "startSync" });
    //           worker.onmessage = async (event) => {
    //             console.log("Worker sent back a message", event);
    //             if (event.data.type === "syncDone") {
    //               resolveFirstLoaderPromise();
    //               const { knownWords, reviewedWordCount } = await initInfo();
    //               // console.log("knownWords", knownWords, reviewedWordCount);
    //               dispatch(setKnownWordsState(knownWords));
    //               dispatch(setNeedsBeginner(reviewedWordCount < MIN_KNOWN_BEFORE_ADVANCED));
    //               const profile = (await pg.query<Profile>(`SELECT * FROM profile WHERE id = $1`, [session.user?.id]))
    //                 .rows[0];
    //               if (!profile) {
    //                 throw new Error("No profile found");
    //               }
    //               setSyncStatus("synced");

    //               dispatch(addDictionaryProviders(profile.dictionary_ordering));

    //               dispatch(
    //                 setUser({
    //                   fromLang: profile.from_lang,
    //                   toLang: profile.to_lang,
    //                   id: session?.user?.id || "",
    //                   translationProviders: profile.dictionary_ordering,
    //                 }),
    //               );
    //             }
    //           };
    //         }
    //       }
    //     }

    //     pg.onLeaderChange(() => changer(session));
    //     await changer(session);
    //   });
    // } else {
    //   console.log("NOT in the session");
    // }
  }, []);

  // const [drizzleForProvider, setDrizzleForProvider] = useState<TranscrobesDB | null>(null);
  // if (!pgForProvider || !drizzleForProvider) {
  if (!pgForProvider) {
    return <Loading />;
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          onClick={() => setShowConfig(!showConfig)}
          color="primary"
          aria-label="Settings"
          size="large"
          sx={{ backgroundColor: "white" }}
        >
          <SettingsIcon />
        </IconButton>
      </Box>
      {showConfig ? <Config /> : <Tables />}
    </>
  );
}
