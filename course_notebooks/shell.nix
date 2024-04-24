{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  packages = [
    pkgs.xsv
    pkgs.saxonb_9_1
    (pkgs.python3.withPackages (py: [
      py.jupyter
      py.pandas
    ]))
  ];
}
