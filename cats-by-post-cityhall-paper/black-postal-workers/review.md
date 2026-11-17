# Fresh Astra review · 17 November 2026

Reviewer: gpt-6-astra, fresh context, read-only review of the complete change
since d1bb0864. No Critical or Important findings.

The review confirmed consistent Black representation in City Hall front/rear
poses and hands, and Depot's driver, worker, reader and seated clerk. All 65
City Hall asset hashes and rig anchors were checked independently. Reversing
only the Depot worker/puppet atlas URLs restored its exact baseline bytes.
Shared original artwork and Sorting Office were untouched.

Matched scenes, phone views, poses and clerk artwork were inspected. The
reviewer independently rendered the old Depot poses and confirmed that its
angular carry folds and sleeve truncation predate this update. City Hall's
raised-hand edge coverage also matches the baseline. No new blocking visual
regression was found. The quality plan correctly does not claim scene parity.

Minor deferred: register-depot.cjs expects original Depot atlases extracted
under work/; it does not bootstrap them in a repository-only checkout. The
published source ZIP includes those exact inputs. Root independently extracted
that ZIP and rebuilt both runtimes byte-for-byte, so the delivered archive is
reproducible. A future repository-only bootstrap remains a developer convenience.

Final source hashes:

- City Hall: 5de7d2fed2bac5043771b9a909c7fdeba994f6ec6b4b0b0705df20c6dc539af7
- Town Depot: 81f8d2fe5229806012c40f40b90706c985b702acefe73709a4000fe88ed0515f

The final local public packet passed 26 hash, link, comparison-toggle, layout and
runtime-boot checks before this review note was added. All 195 protected files
remain exact. No physical-device or reference-parity claim is made.
