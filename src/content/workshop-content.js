export const workshopContent = {
  // brandLabel: 'HVG 2026',
  tabs: [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'topics', label: 'Topics' },
    { id: 'important-dates', label: 'Important Dates' },
    { id: 'instructions-for-authors', label: 'Instructions for Authors' },
    { id: 'committee', label: 'Committee' },
    { id: 'workshop-schedule', label: 'Workshop Schedule' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    title: 'Human-Centric Video Generation(HVG)',
    subtitle:
      'Advancing controllable, realistic, and physically plausible human video synthesis for the ICPR 2026 research community.',
    eventLabel: 'ICPR 2026 WORKSHOP',
  },
  overview: {
    title: 'OVERVIEW',
    paragraphs: [
      'The Workshop on Human-Centric Video Generation (HVG) will focus on advancing methodologies for synthesizing realistic 2D human videos guided by multimodal control signals such as text, audio, and pose, while addressing critical challenges in temporal consistency, anatomical fidelity, and environmental interaction.',
      'Aligned with recent advances in diffusion models, auto-regressive models, and generative AI, this workshop emphasizes three core technical pillars: conditional motion synthesis, quality assurance, and evaluation frameworks for human video generation.',
      'The workshop will solicit technical papers, oral and poster presentations, and keynote talks emphasizing emerging frontiers such as physics-informed motion modeling, efficiency optimization for diffusion frameworks, and ethical deployment of generative human models.',
      'By uniting researchers in generative AI, motion analysis, and human-computer interaction, HVG aims to establish rigorous benchmarks, address persistent challenges in deformable body synthesis, and catalyze interdisciplinary innovation for human-centric video generation.',
    ],
    pillars: [
      {
        title: 'Conditional Motion Synthesis',
        detail:
          'Text-to-action alignment, audio-driven co-speech gestures, and pose-guided motion transfer for controllable human video generation.',
      },
      {
        title: 'Quality Assurance',
        detail:
          'Occlusion handling, deformation mitigation, appearance consistency, and anatomically plausible human motion synthesis.',
      },
      {
        title: 'Evaluation Frameworks',
        detail:
          'Metrics for temporal stability, biomechanical plausibility, action accuracy, and environment interaction.',
      },
    ],
  },
  topics: {
    title: 'Topics',
    items: [
      'Text-Driven Synthesis: Generating human videos from textual descriptions with accurate action-semantic alignment.',
      'Audio-Gesture Synchronization: Modeling co-speech gesture dynamics from audio-visual correlations.',
      'Pose-Guided Motion Transfer: Transferring source motion to target subjects while preserving identity and context.',
      'Multi-Conditional Animation: Integrating heterogeneous control signals for composition-aware generation.',
      'Long-Form Synthesis: Maintaining consistency and diversity in extended video sequences.',
      'Interactive Generation: Enabling real-time user control via sketches, prompts, or physical simulations.',
      'Dataset Curation: Constructing cross-modal datasets with annotated human motions and multi-view sequences.',
      '3D-Consistent Avatars: Bridging 2D generation with 3D-aware representations for viewpoint-invariant synthesis.',
    ],
  },
  importantDates: {
    title: 'Important Dates',
    items: [
      'Submission Deadline: May 01, 2026',
      'Author Notification: June 10, 2026',
      'Camera-Ready Deadline: June 20, 2026',
      'Workshop Date: August 21, 2026',
    ],
  },
  authorInstructions: {
    title: 'Instructions for Authors',
    submissionGuidelines:
      'The conference workshop proceeding will be published in the Lecture Notes in Computer Science (LNCS) series. The authors requested to submit the papers in LNCS format available on the ICPR 2026 website. Each paper must have a minimum length of 6 pages and should not exceed 15 pages, including references. If the paper exceeds 15 pages, the authors must pay 150€ for each additional page.',
    authorsWebsiteUrl: 'https://icpr2026.org/authors.html',
    submissionSystemUrl: 'https://cmt3.research.microsoft.com/',
    cmtAcknowledgement:
      'The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.',
    ethics:
      'We confirm that all participants will be welcome without any restriction due to political, racial, or religious differences. We also confirm that the workshop organizers will be bound by the IAPR Statement of Ethics and that the IAPR Ethical Requirements for Authors will be prominently displayed on the conference website.',
  },
  committee: {
    title: 'Committee',
    members: [
      {
        name: 'Siyu Zhu',
        role: 'General Chair',
        affiliation: 'Fudan University',
        email: 'siyuzhu@fudan.edu.cn',
        bioParagraphs: [
          'Siyu Zhu, Professor, Fudan University. He leads the generative vision lab (Fusion Lab). He served as a director at Alibaba Cloud AI Lab, leading a team of 100 employees, and contributed to various aspects of computer vision and machine learning-related products. He also co-founded the 3D vision company Altizure, which was later acquired by Apple and contributed core technology to Apple Augmented Reality.',
          'His research interests include generative models for video and 3D, especially 3D and physics guided video generation, as well as image-based 3D reconstruction. He has served as the program committee member or area chair of AAAI and ICCV and as the associate editor of IEEE Transactions on Visualization and Computer Graphics.',
        ],
      },
      {
        name: 'Jingdong Wang',
        role: 'General Chair',
        affiliation: 'Baidu',
        email: 'wangjingdong@baidu.com',
        bioParagraphs: [
          'Jingdong Wang, Chief Scientist for Computer Vision, Baidu. Before joining Baidu, he was a Senior Principal Researcher at Microsoft Research Asia. His areas of interest include computer vision, deep learning, and multimedia search.',
          'His representative works include high-resolution networks, OCRNet for semantic segmentation, and DRFI for saliency detection. He has served as an Associate Editor of IEEE TPAMI, IJCV, ACM TOMM, IEEE TMM, and IEEE TCSVT and is a Fellow of IAPR, IEEE, and CAE.',
        ],
      },
      {
        name: 'Hui Li',
        role: 'General Chair',
        affiliation: 'Fudan University',
        email: 'hli24@m.fudan.edu.cn',
        bioParagraphs: [
          'Hui Li, PhD Candidate, Fudan University. She is a PhD student at Fudan University working on human-centric video generation and has published papers on this topic at CVPR and ICLR, with related GitHub projects collectively garnering 13.5k stars.',
        ],
      },
      {
        name: 'Baoyou Chen',
        role: 'General Chair',
        affiliation: 'Fudan University',
        email: 'bychen25@m.fudan.edu.cn',
        bioParagraphs: [
          'Baoyou Chen, PhD Candidate, Fudan University. He is a PhD student at Fudan University working on video face restortion and human-centric video generation, and he has published several papers on these topics at ICCV and SIGGRAPH Asia while related GitHub projects have achieved over 1k stars.',
        ],
      },
      {
        name: 'Mingwang Xu',
        role: 'General Chair',
        affiliation: 'Fudan University',
        email: 'mingwang.xu.cq@gmail.com',
        bioParagraphs: [
          'Mingwang Xu, PhD Candidate, Fudan University. He specializes in human-centric video generation, has published and open-sourced the audio-driven facial video generation model Hallo, has published workshop-related research at CVPR, and played a key role in organizing the international visual image challenge TDSC-ABUS 2023.',
        ],
      },
      {
        name: 'Kaihui Cheng',
        role: 'General Chair',
        affiliation: 'Fudan University',
        email: 'khcheng24@m.fudan.edu.cn',
        bioParagraphs: [
          'Kaihui Cheng, PhD Candidate, Fudan University. He specializes in generative models, has published research on generative modeling at AAAI, has served as a reviewer for IEEE Transactions on Visualization and Computer Graphics, and his related GitHub projects have collectively accumulated over 700 stars.',
        ],
      },
      {
        name: 'Jiahao Cui',
        role: 'General Chair',
        affiliation: 'Fudan University',
        email: 'cuijh25@m.fudan.edu.cn',
        bioParagraphs: [
          'Jiahao Cui, PhD Candidate, Fudan University. He specializes in human-centric video generation, has published multiple papers on this topic at CVPR, ICLR, and SIGGRAPH Asia, and the corresponding open-source code for his work on GitHub has been well received by the community, amassing over 5,000 stars.',
        ],
      },
      {
        name: 'Quanhui Tang',
        role: 'General Chair',
        affiliation: 'Fudan University',
        email: 'qhtang25@m.fudan.edu.cn',
        bioParagraphs: [
          'Quanhui Tang, PhD Candidate, Fudan University. He is a PhD student at Fudan University specializing in human-centric video generation and supports the workshop on research coordination and author communication.',
        ],
      },
      {
        name: 'Enze Xie',
        role: 'General Chair',
        affiliation: 'NVIDIA',
        email: 'xieenze@connect.hku.hk',
        bioParagraphs: [
          "Enze Xie, Senior Research Scientist, NVIDIA. He is Senior Research Scientist at NVIDIA Research. He was a Principal Researcher and Research Lead in Generative AI at Huawei Noah's Ark Lab. During his PhD study, he collaborated with several researchers in industry including Facebook and NVIDIA.",
          "His research interests are challenging problems in generative AI, computer vision, and deep learning. His research SANA contributes to NVIDIA's flagship generative AI projects including DLSS and Cosmos, and his research SegFormer significantly improved the robustness of real-world autonomous driving.",
        ],
      },
      {
        name: 'Nicu Sebe',
        role: 'General Chair',
        affiliation: 'University of Trento',
        email: 'sebe@disi.unitn.it',
        bioParagraphs: [
          'Nicu Sebe, Professor, University of Trento. He leads research in multimedia information retrieval and human-computer interaction in computer vision applications at the University of Trento, Italy.',
          'He has been involved in the organization of major conferences and workshops addressing computer vision and human-centered aspects of multimedia information retrieval. He is a fellow of ELLIS and IAPR and a Senior member of ACM and IEEE.',
        ],
      },
      {
        name: 'Michael J. Black',
        role: 'General Chair',
        affiliation: 'Max Planck Institute for Intelligent Systems',
        email: 'black@tuebingen.mpg.de',
        bioParagraphs: [
          'Michael J. Black, Professor, Max Planck Institute for Intelligent Systems. He received his B.Sc. from the University of British Columbia, his M.S. from Stanford, and his Ph.D. from Yale University.',
          'He is one of the founding directors at the Max Planck Institute for Intelligent Systems in Tubingen, Germany, where he leads the Perceiving Systems department. His work has won major awards in computer vision, and in 2013 he co-founded Body Labs Inc., which was acquired by Amazon in 2017.',
        ],
      },
    ],
  },
  contact: {
    title: 'Contact',
    name: 'Quanhui Tang',
    email: 'qhtang25@m.fudan.edu.cn',
    note: 'For organizational questions and workshop communication, please contact the workshop team representative below.',
  },
  program: {
    title: 'Workshop Schedule',
    date: 'Friday, 21 August 2026',
    slot: 'Full-Day Workshop | 08:30-17:30',
    highlight: 'HVG',
  },
  footer: {},
}

