---
layout: post
title: Quick Wireless Methodology
---

Wireless networks present unique security challenges due to the broadcast nature of radio communications. A rigorous wireless penetration test methodology is crucial for evaluating the security posture of an organization's wireless infrastructure. This assessment involves both passive discovery techniques for mapping and profiling wireless networks, as well as active attacks to exploit vulnerabilities in wireless implementations. The testing begins with passive reconnaissance to identify authorized and rogue wireless access points. While the passive discovery stage allows mapping of the known wireless infrastructure, rogue AP detection involves active scanning across all wireless channels to uncover hidden threats. This is followed by more intrusive attacks to demonstrate risk, such as cracking wireless encryption, operating an evil twin access point, and testing wireless network segmentation. By leveraging a combination of passive wireless network discovery, rogue AP detection, and targeted wireless attacks, this methodology provides a comprehensive evaluation of wireless infrastructure security. The layered approach helps identify vulnerabilities in wireless configurations, encryption protocols, access controls, and network segmentation that could be exploited by malicious actors. Conducting controlled simulations of real-world wireless attacks provides actionable risk insights that allow organizations to improve protections and minimize avenues for wireless breaches. A rigorous wireless pen test methodology is invaluable for proactively hardening the security posture against the unique threats faced by today’s wireless networks.

A point to highlight since it can often be overlooked is rogue AP discovery. This involves using wireless scanning tools to identify any unauthorized or unknown wireless access points connected to the network. This is an important step because rogue APs can enable backdoor wireless access that bypasses security controls. Attackers may plug in their own cheap AP into an open network jack to create wireless access. Even misconfigured authorized APs can act as rogues if they are installed without IT knowledge. By surveying across all wireless channels and comparing to an inventory of authorized APs, penetration testers can identify any rogue devices. Analyzing the rogue's traffic, encryption, SSID, and connected clients provides insight into whether it poses a security risk or is being used maliciously. Identifying and removing rogue APs is critical for maintaining full control and monitoring of wireless access to the network.

## Passive Discovery
- Use wireless network scanning tools like Kismet or Wireshark to identify SSIDs, channel utilization, encryption types, client devices, and broadcast traffic patterns.
- Take note of what version of WPA encryption each network is using (WPA, WPA2, WPA3).
- Analyze traffic to fingerprint wireless networks, client devices, and applications in use.
- Review wireless configuration settings like channels, transmit power, SSID broadcast, and wireless security protocols in use.
- Use airodump-ng or other tools to capture WPA2 authentication handshakes for networks using WPA2 security.
- Collect as many WPA2 handshakes as possible to allow for offline password cracking attacks. The more handshakes, the higher likelihood of capturing reusable credentials.
- Review authentication mechanisms (WPA-PEAP/RADIUS/etc) to identify any weak or outdated protocols in use.

## Rogue AP Discovery
- Use tools like Kismet or aircrack-ng to scan across frequencies to identify rogue APs with MAC addresses not matching your asset inventory.
- Analyze traffic patterns, client connections, and DHCP scopes to determine if the rogue AP is providing network access or is being used maliciously.
- Use directional antennas or reducing scanning frequency range to hone in on potential rogue APs.
- Filter out known good SSIDs

## Attacks
- Use aircrack-ng, hcxtools, or other tools to capture WPA handshakes and attempt offline PSK cracking if weak passwords are used.
- Configuring an evil twin AP to mimic the SSID and encryption of the target network to trick clients into connecting and capture credentials or data.
- Attempt connecting to any open or weakly encrypted networks to directly access resources and pivot.
- Confirm segmentation controls are working properly between guest and corporate networks.