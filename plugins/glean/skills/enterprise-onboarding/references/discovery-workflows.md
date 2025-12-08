# Enterprise Discovery Workflows

Extended patterns for common discovery scenarios.

## Finding the Right Person

### Scenario: Need an Expert
When a user needs to find someone who knows about a topic:

1. **Search for people by expertise:**
   ```
   employee_search "authentication security expert"
   ```

2. **If no direct match, search documents and find authors:**
   ```
   search "authentication security architecture owner:*"
   ```

3. **Look at document owners for subject matter experts**

### Scenario: Escalation Path
When a user needs to escalate or get approval:

1. **Find the relevant team:**
   ```
   employee_search "[topic] team"
   ```

2. **Find managers in that area:**
   ```
   employee_search "[topic] roletype:\"manager\""
   ```

3. **Check reporting structure:**
   ```
   employee_search "reportsto:\"[manager name]\""
   ```

## Understanding a New Project

### Scenario: Joining a Team
When a user is onboarding to a new team:

1. **Find team members:**
   ```
   employee_search "[team name]"
   ```

2. **Find team documentation:**
   ```
   search "team:[team name] onboarding OR getting started"
   ```

3. **Find recent decisions:**
   ```
   search "[team name] decision updated:past_month"
   ```

4. **Find key meetings:**
   ```
   meeting_lookup "topic:\"[team name]\" after:now-2w before:now"
   ```

### Scenario: Taking Over a Project
When a user is inheriting a project:

1. **Find the previous owner:**
   ```
   search "[project name] owner:*"
   ```

2. **Review their recent documents:**
   ```
   search "owner:\"[previous owner]\" [project name] updated:past_month"
   ```

3. **Find architecture docs:**
   ```
   search "[project name] architecture OR design doc"
   ```

## Policy and Process Discovery

### Scenario: What's the Process?
When a user needs to follow a process:

1. **Ask Glean Chat for synthesis:**
   ```
   chat "What is the process for [topic] at our company?"
   ```

2. **Find the canonical document:**
   ```
   search "[topic] process OR procedure app:confluence"
   ```

3. **Read and extract steps:**
   ```
   read_document [URL from search results]
   ```

### Scenario: Approval Workflows
When a user needs approval for something:

1. **Find the policy:**
   ```
   search "[topic] approval policy"
   ```

2. **Find the approvers:**
   ```
   employee_search "[topic] approver OR reviewer"
   ```

3. **Check recent examples:**
   ```
   search "[topic] approved updated:past_month"
   ```

## Cross-Team Collaboration

### Scenario: Finding Stakeholders
When a user needs to identify stakeholders:

1. **Find related teams:**
   ```
   employee_search "[topic] team"
   ```

2. **Find people who've worked on similar projects:**
   ```
   search "[similar topic] owner:*"
   ```

3. **Find meeting participants:**
   ```
   meeting_lookup "topic:\"[topic]\" after:now-1M before:now extract_transcript:\"true\""
   ```

### Scenario: Understanding Dependencies
When a user needs to understand cross-team dependencies:

1. **Search for integration docs:**
   ```
   search "[your team] [other team] integration"
   ```

2. **Find shared channels:**
   ```
   search "[your team] [other team] app:slack channel:*"
   ```

3. **Find joint meetings:**
   ```
   meeting_lookup "after:now-1M before:now topic:\"[your team]\" topic:\"[other team]\""
   ```
