const ScoreItem = (props) => {
	const itemClass = `rounded border border-black text-black italic w-1/2 px-10 py-2 mb-2 ${
		props.isSelf ? "bg-amber-200" : "bg-white/80"
	}`;
	return (
		<div className={itemClass}>
			<p className="text-gray-800/70">{props.alias}</p>
			<h1 className="text-2xl font-bold">{props.score}</h1>
		</div>
	);
};

// props: scores, onHide(), state, player
const ScoreList = (props) => {
	// filter only the scores for the current game mode
	let mappedRecordsByState = props.records.map((record) => {
		return {
			alias: record.alias,
			id: record.id,
			score: record[props.state],
		};
	});

	// sort by score
	mappedRecordsByState.sort((a, b) => a.score - b.score);

    // filter out all those with '0' for score (never attempted)
    const filteredRecords = mappedRecordsByState.filter((record) => record.score !== 0);

	return (
		<div className="flex justify-center items-center w-3/4">
			{filteredRecords.length > 0 &&  filteredRecords.map((record) => {
				const isCurPlayer = record.id === props.id;
				return (
					<ScoreItem
						key={record.id}
						score={record.score}
						alias={record.alias}
						isSelf={isCurPlayer}
					/>
				);
			})}
		</div>
	);
};

export default ScoreList;
