
import MeetOurTeamCss from "./MeetOurTeam.module.css";

const MeetOurTeam = () => {
  return (
    <section id="ourteam" className={MeetOurTeamCss.meetOurTeam}>
      <h2>Meet Our Team</h2>
      <div className={MeetOurTeamCss.teamMembers}>
        <div className={MeetOurTeamCss.member}>
          <img src="/path-to-your/team-member1.jpg" alt="Team Member 1" />
          <h3>John Doe</h3>
          <p>CEO</p>
        </div>
        <div className={MeetOurTeamCss.member}>
          <img src="/path-to-your/team-member2.jpg" alt="Team Member 2" />
          <h3>Jane Smith</h3>
          <p>Lead Insurance Advisor</p>
        </div>
        <div className={MeetOurTeamCss.member}>
          <img src="/path-to-your/team-member3.jpg" alt="Team Member 3" />
          <h3>Emily Johnson</h3>
          <p>Customer Support Manager</p>
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
