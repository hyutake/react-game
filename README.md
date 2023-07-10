# リアクト　エイム　トレイナ

## Features:
<ul>
    <li><b>Frontend</b></li>
    <ul>
        <li>Login/logout - uses useAuthContext(), which uses both useAuth and useLocalStorage to handle 'current' user data</li>
        <li>HomePage -> shows the playable aim trainer + existing high scores</li>
        <ul>
            <li>4 timers (15, 30, 45, 60) x 3 window sizes (s, m, l) = 12 different "game states"</li>
            <li>Game targets have their positions re-generated using useEffect() - triggered when score updates (i.e. increases)</li>
            <ul>
                <li>There are 3 different algos to spawn targets (3 different useEffects()), but only 1 can be 'active' (uncommented)</li>
                <li>There's 1. Fully randomised, 2. Semi randomised (spawns within a set range from prev. position) and 3. Alternate between center & random</li>
            </ul>
            <li>Game display itself has "3 pages" (not actually router pages) - START, GAME and STATS</li>
            <ul>
                <li>Expected (ideal) flow: START -> GAME -> STATS -> START (loop)</li>
                <li>Controlled using 2 state vars: isActive & showStats (useState())</li>
            </ul>
            <li>Customisation: crosshair (3 presets), target color (4 presets), game state itself via TargetNavigation</li>
        </ul>
        <li>Custom hooks used</li>
        <ul>
            <li>useHttp({requestConfig, applyData}) - for the sending of HTTP requests to backend (uses axios)</li>
            <li>useTimer(initialTime) - for countdown timer that updates every 10ms</li>
            <li>useLocalStorage() - for storage and retrieval of data in localStorage</li>
            <li>useAuth() - for everything to do with authentication: user, login, signup, logout</li>
        </ul>
        <li>Test Page -> purely for the manual testing of features in isolation</li>
        <li>Scores Page -> technically a product from Test Page - to display the existing highscores of the current player</li>
        <ul>
            <li>Only available when logged in</li>
        </ul>
    </ul>
    <li><b>Backend</b></li>
    <ul>
        <li>Listening on port 4000</li>
        <li>Authentication using JWT token (backend) - needed for POST req</li>
        <li>Verification for users (login/signup), token (authorization), and updating of scores (POST req.)</li>
        <li>Local storage (literally) in users.json - no database integration (yet?)</li>
    </ul>
</ul>

## Todos:
<ul>
    <li>Backend score keeping integration - mostly working? No bugs found so far</li>
    <li>Customisable targets - 4 colors for now, maybe do game types later</li>
    <ul>
        <li>3 different target spawning algo created (full random, less random, alt. center and random)</li>
         <li>Need to manually comment out their respective useEffect() hooks to use any one of them</li>
    </ul>
    <li>Customisable xhair - 3 presets for now</li>
    <li>Use tailwind css - trying</li>
</ul>