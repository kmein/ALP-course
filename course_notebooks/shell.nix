{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  packages = [
    pkgs.gnumake
    pkgs.xsv
    pkgs.saxonb_9_1
    (pkgs.python3.withPackages (py: [
      py.jupyter
      py.pandas
      py.matplotlib
      py.scikit-learn
      py.plotly
      py.networkx
    ]))
  ];
}
