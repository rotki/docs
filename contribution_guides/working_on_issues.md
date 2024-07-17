# Working on issues

The current workflow for working on issues is the following.

## Picking up work

Work can be picked up by checking the next patch release and/or the next feature release milestone. All the milestone issues are kept in descending order of priority. So the higher an issue appears in the milestone, the higher its priority. The responsibility of keeping priority is up to the product owner (currently only Lefteris).

As a developer, you can pick up an issue by checking the milestone and asking the product owner. Once they give the go-ahead, you can pick it up. If the product owner is unavailable, and you do not have anything else to work on, pick an issue with high priority and you can discuss it with them later.

When you pick an issue, **assign yourself** to it in GitHub.

## Opening a PR

To implement your work, you should create a feature branch based on either `bugfixes` if you are targeting a patch release or `develop` if you are targeting a feature release.

Whenever you are ready to share your work with your colleagues, you can open a Pull Request in GitHub from this branch. If you just want to get it to run all tests and not be checked by colleagues, **open it as a draft**.

### Backend Team

Once you are ready for the PR to be seen by your colleagues, set the label to `ready for peer review` and ping `@rotki-backend-devs` in Discord asking for a review.

Your colleague will review the PR and leave you multiple comments. Then they will set the label `PR review work` to the PR and ping you. After this back and forth, and once both you and your colleague are sure the PR is ready, you can proceed to the next stage.

Set the label to `ready for final review` and ping the product owner (currently only Lefteris) in Discord. The same process as above is repeated until the PR is merged.

### Coordination between Teams

Once an issue that needs work for both backend and frontend has the backend part done, it needs to be passed over to the frontend team. To do that, let the frontend know by pinging them in Discord using `@rotki-frontend-devs` but also by using the label "Needs FR work" so they can filter what can be picked by them to close issues.

## Changelog

If the issue is either fixing a user-facing bug or adding a feature, you should add a changelog entry in `changelog.rst`. The changelog text should be user-facing and make sense to the user. Do not use internal-rotki speak as they would not understand it.

Also, if you are a backend developer and there is still frontend work to do, **do not** add a changelog entry. We leave it to the frontend to do that.

## Finalizing

Make sure the issue is closed once both backend and frontend work have been merged into the target branch.
