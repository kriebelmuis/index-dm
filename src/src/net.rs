use std::{
	fs, sync::Arc, time::Duration,
};

use librqbit::{
	AddTorrent, AddTorrentOptions, AddTorrentResponse, ManagedTorrent, Session,
};

use anyhow::Context;


#[tokio::main]
pub async fn start_torrent(magnet: &str) -> anyhow::Result<Arc<ManagedTorrent>> {
    let cur_dir = std::env::current_dir().unwrap();

    let dir: Option<std::path::PathBuf> = match fs::create_dir(&cur_dir.join("download")) {
        Ok(_) => Some(cur_dir.join("download")),
        Err(_) => Some(cur_dir),
    };

    println!("creating session");
    let session = Session::new(dir.unwrap()) // todo: request session opts in rqbit
    .await
    .context("error creating session")?;

    println!("adding torrent");
    let handle = match session
        .add_torrent(
            AddTorrent::from_url(magnet),
            Some(AddTorrentOptions {
                overwrite: true,
                ..Default::default()
            }),
        )
        .await
        .context("error adding torrent")?
    {
        AddTorrentResponse::Added(_, handle) => handle,
        _ => unreachable!(),
    };

    println!("downloading torrent");
    tokio::spawn({
        let handle = handle.clone();
        async move {
            loop {
                tokio::time::sleep(Duration::from_secs(1)).await;
                let stats = handle.stats();
                println!("{}", stats.progress_percent_human_readable());
            }
        }
    });

	handle.wait_until_completed().await?;
    Ok(handle)
}
