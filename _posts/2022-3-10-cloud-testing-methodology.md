---
layout: post
title: Cloud Testing Methodology
---

While some of the attack surface is the same as standard network pentesting, the cloud does presents some additional attack surface with the introduction of services like serverless, managed infrastructure, inter-cloud routing, etc. Often with cloud pentesting what the attacker is exploiting is not necessarily a vulnerability in the traditional sense but more a misconfiguration. Sometimes these errors are due to using old networking ideologies in the cloud, sometimes due to changes in the managed infrastructure itself, and sometimes a misunderstanding in how the service is intended to work. Throughout this we will highlight some of the difference with pentesting in cloud environments as we go through the different phases of a cloud pentest.

* Recon:
Much of the enumeration process should be familiar: subdomain enum, username enum, dns enum. Things to look for are where the infrastructure is hosted to determine what services might be in use, ie AWS then AWS Lambda vs Azure Functions. There are slight differences between how these services are implemented which can be helpful to think about from the start of the attack process. Another thing to keep in mind is looking through a target's code repos if public. This can give out more details about the tech in use. This is also where an attacker will attempt to look for any credentials or access keys. 

* Initial Access:
The biggest difference with cloud pentesting is the initial access that access keys can provide. These keys don’t necessarily provide the attacker with RCE on a host but they provide an attacker with a window into the cloud network. Using those keys an attacker can begin to enumerate the cloud infrastructure, ie users, roles, policies, and hosts. One thing to keep in mind with access keys, often times even low level keys can enumerate additional information about the infrastructure much like if the a user was on a traditional internal network and scanning hosts. Other ways of initial access are SSRF vulnerabilities in web applications and abusing the metadata service that cloud providers have. This can be used to get temporary access keys to the environment. Additional initial access points are often misconfigurations with admins accidentally making services publicly accepted due to a lack of experience with cloud networking. Think a database admin console being publicly exposed due to misunderstanding of AWS security groups. 

* Network Access and Discovery
Enumerate access of credentials or roles that attacker has access to. Keys may have access to certain services which can be used for further information gain or exploitation within the environment
Use cloud shells to manage resources and potentially find more creds, keys, etc on resources
Be careful of access keys that are not full administrator but have access to certain admin functionality like creating new keys/profiles and creating policies.
Enumerate access that resources have, can help map the rest of the enivornment.
Check for access to Snapshots. Can contain Windows credentials via SAM, Linux creds via /etc/shadow, or configs for web apps

* Lateral Movement:
Can install own beacon or c2. can use built in features of cloud infra like cloud shell, console, etc. 
Modify ACL at the blog or bucket level to provide access
A cloud pentest doesn’t have the same goal of getting Domain Admin of a network, it should be more goal oriented. The goal being get access to a certain bucket or host or getting access to certain data.

* Persistence:
Create new access keys
RBAC changes to their compromised identities
Firewall/vlan changes to allow access from outside intended destinations

* Exfil:
Built in features to clone or backup data. Modify ACLs to allow outbound access.

