.PHONY: all clean

all: rv.csv

clean:
	rm rv_book_*.csv

rv.csv: rv_book_01.csv rv_book_02.csv rv_book_03.csv rv_book_04.csv rv_book_05.csv rv_book_06.csv rv_book_07.csv rv_book_08.csv rv_book_09.csv rv_book_10.csv
	xsv cat rows $^ --output $@

rv_book_%.csv: vedaweb-data/rigveda/TEI/rv_book_%.tei
	saxonb -s:$< -xsl:tei2csv.xslt -o:$@
