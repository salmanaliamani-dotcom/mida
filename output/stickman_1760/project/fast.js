// speed patch: pre-rendered textures instead of per-frame turbulence filters
var fastTex = (x = -400, y = -400, w = W + 800, h = H + 800) => `<image href="tex.png" x="-400" y="-400" width="${W + 800}" height="${H + 800}" preserveAspectRatio="none" style="mix-blend-mode:multiply"/>`;
let _gf = 0;
var fastFinish = (g = .07) => `<rect width="${W}" height="${H}" fill="url(#vig)"/><image href="grain${_gf % 6}.jpg" width="${W}" height="${H}" opacity="${g}" style="mix-blend-mode:overlay"/>`;
